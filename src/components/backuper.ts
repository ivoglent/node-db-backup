import {DumperInterface} from "../interfaces/dumper.interface";
import {UploaderInterface} from "../interfaces/uploader.interface";
import {error} from "util";
/**
 * Created by ivoglent on 5/29/18.
 */
export class Backuper{
    constructor(protected dumper : DumperInterface, protected uploader : UploaderInterface) {

    }

    /**
     *
     * @returns {Promise<T>}
     */
    public start(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.dump().then(function (filePath) {
                resolve(filePath);
            }).catch(reject);
        });
    }

    /**
     *
     * @returns {Promise<T>}
     */
    public dump(): Promise<string> {
        return new Promise((resolve, reject) => {
            let self = this;
            this.dumper.execute().then((filePath) => {
                const path = require('path');
                let zipPath = path.join(path.dirname(filePath), path.basename(filePath) + '.zip');
                self.dumper.zipFolder(filePath, zipPath, true).then((result) => {
                    resolve(zipPath);
                }).catch(reject);
            }).catch((error) => {
                console.error(error);
            });
        });
    }

    /**
     *
     * @returns {Promise<T>}
     */
    public upload(): Promise<string> {
        return new Promise((resolve, reject) => {

        });
    }
}