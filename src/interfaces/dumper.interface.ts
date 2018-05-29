/**
 * Created by ivoglent on 5/29/18.
 */
export interface DumperConfigInterface{
    host: string,
    port: number,
    username : string,
    password : string,
    database : string
}
export interface DumperInterface{
    backupPath : string,
    //fileNameTemplate : string,
    execute(): Promise<string>;
    zipFolder(path, file, remove): Promise<boolean>;
}