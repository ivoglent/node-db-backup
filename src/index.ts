import {DumperConfigInterface, DumperInterface} from "./interfaces/dumper.interface";
import {UploaderInterface} from "./interfaces/uploader.interface";
import {MySqlDumper} from "./dumpers/mysql";
import {MongoDbDumper} from "./dumpers/mongodb";
import {Backuper} from "./components/backuper";
const commandLineArgs = require('command-line-args');
const optionDefinitions = [
    { name: 'type', alias: 't', type: String, required : true, defaultValue: 'mongodb'},
    { name: 'database', alias: 'd', type: String, required : true},
    { name: 'username', alias: 'u', type: String, required : true},
    { name: 'host', alias: 'h', type: String, required : true},
    { name: 'port', type: String, required : true},
    { name: 'path', type: String, required : false},
    { name: 'password', alias: 'p', type: String, required : true},
    { name: 'upload', alias: 'l', type: String, required : false, defaultValue: ''},
    { name: 'fpt-host', type: String, required : false, defaultValue: ''},
    { name: 'fpt-port', type: String, required : false, defaultValue: ''},
    { name: 'fpt-username', type: String, required : false, defaultValue: ''},
    { name: 'fpt-password', type: String, required : false, defaultValue: ''},
    { name: 'fpt-path', type: String, required : false, defaultValue: ''},
    { name: 's3-client-key', type: String, required : false, defaultValue: ''},
    { name: 's3-secret-key', type: String, required : false, defaultValue: ''},
    { name: 'google-client-key', type: String, required : false, defaultValue: ''},
    { name: 'google-secret-key', type: String, required : false, defaultValue: ''},
];
let options = commandLineArgs(optionDefinitions);
let valid = true;
optionDefinitions.forEach(function (dn) {
    if (dn.required && !options[dn.name]) {
        valid = false;
        console.error(`Option ${dn.name} is required!`);
    }
});
if (!valid) {
    console.log('Error! Not enough param to run this module');
    process.exit(1);
}
const supportDb = {
    mysql : 'MySQL database',
    mongodb : 'MongoDB database'
};
const supportRemoteUploadTypes = {
    GoogleDrive : 'Upload to Google Drive',
    FtpHost : 'Upload to a FTP Host',
    AmazoneS3 : 'Upload to Amazone S3'
};


if (!supportDb[options.type]) {
    throw new Error('Unsupport database type');
}

if (options.upload && !supportRemoteUploadTypes[options.upload]) {
    throw new Error('Unsupport remote upload type');
}

let dumper: DumperInterface;
let uploader: UploaderInterface = null;
const config: DumperConfigInterface = {
    host: options.host,
    port: options.port,
    username: options.username,
    password: options.password,
    database: options.database,
};
switch (options.type) {
    case 'mysql' :
        dumper = new MySqlDumper(config);
        break;
    case 'mongodb' :
        dumper = new MongoDbDumper(config);
        break;
}
if (options.path) {
    dumper.backupPath = options.path;
}
let backuper = new Backuper(dumper, uploader);
backuper.start().then((result) => {
    if (result) {
        console.log('Done!', result);
    } else {
        console.log('Backup failed')
    }
}).catch((e) => {
    console.error(e);
});