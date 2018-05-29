import {error} from "util";
/**
 * Created by ivoglent on 5/29/18.
 */
const AdmZip = require("adm-zip");
const path = require('path');
const fs = require('fs');
export class Zipper{
    zip: any;
    constructor() {
        this.zip = new AdmZip();
    }

    /**
     *
     * @param files
     */
    public addFile(file: string) {
        this.zip.file(path.basename(file), fs.readFileSync(file));
    }

    /**
     *
     * @param path
     */
    public addFolder(path: string) {
        this.zip.addLocalFolder(path);
    }

    /**
     *
     * @param path
     * @returns {Promise<T>}
     */
    public execute(path: string) : Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                this.zip.writeZip(path);
                resolve(path);
            } catch (e) {
                reject(e);
            }
        });
    }
}

/*

let zipper = new Zipper();
zipper.addFolder('/tmp/db');
zipper.execute('/tmp/db.zip').then((file) => {
    console.log(file);
}).catch((e) => {
    console.error('Error: ', e);
});*/
