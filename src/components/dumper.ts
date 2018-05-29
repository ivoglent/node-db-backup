import {DumperConfigInterface, DumperInterface} from "../interfaces/dumper.interface";
import {Zipper} from "./zipper";
import {Helper} from "./helper";
/**
 * Created by ivoglent on 5/29/18.
 */

export abstract class Dumper{
    backupPath: string;
    fileNameTemplate: string;
    constructor(protected config: DumperConfigInterface) {

    }

    /**
     *
     * @param path
     * @param filename
     * @param remove
     * @returns {Promise<T>}
     */
    public zipFolder(path: string, filename: string, remove: boolean = false): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                let zipper = new Zipper();
                zipper.addFolder(path);
                zipper.execute(filename).then(function () {
                    if (remove) {
                        Helper.rmdir(path);
                    }
                    resolve(true);
                }).catch(reject);
            } catch (e) {
                reject(e);
            }
        })
    }

    /**
     *
     * @returns {string}
     */
    protected getTimeDir() {
        let d = new Date();
        return  d.getFullYear() + "" + (d.getMonth()+1) + "" + d.getDate() + "" + d.getHours() + "" + d.getMinutes();
    }
}