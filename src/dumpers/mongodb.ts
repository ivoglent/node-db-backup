import {DumperConfigInterface, DumperInterface} from "../interfaces/dumper.interface";
import {Dumper} from "../components/dumper";
/**
 * Created by ivoglent on 5/29/18.
 */
export class MongoDbDumper extends Dumper implements DumperInterface{
    execute(): Promise<string> {
        let params = [
            '--host', this.config.host,
            '--port', this.config.port ? this.config.port : 27017,
            '--username', this.config.username,
            '--password', this.config.password,
            '--authenticationDatabase', 'admin'
        ];
        if (this.config.database) {
            params.push('--db');
            params.push(this.config.database);
        }
        let path = this.backupPath;

        let timeDir = this.getTimeDir();
        if (!path) {
            path = require('path').join(require('os').homedir(), '/.node-db-backup/mongodb/' + timeDir);
        }
        params.push('--out');
        params.push(path);
        console.log(params.join(' '));
        const spawn = require('child_process').spawn;
        return new Promise((resolve, reject) => {
            let p = spawn('mongodump', params);
            p.stdout.on('data', (data) => {
                console.log(data.toString());
            });
            p.stderr.on('data', (data) => {
                console.log(data.toString());
            });
            p.on('exit', (code) => {
                if (code === 0) {
                    resolve(path);
                } else {
                    reject(false);
                }
            })
        })
    }

}