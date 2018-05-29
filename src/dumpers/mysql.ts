import {DumperInterface} from "../interfaces/dumper.interface";
import {Dumper} from "../components/dumper";

export class MySqlDumper extends Dumper implements DumperInterface{
    execute(): Promise<string> {
        return undefined;
    }

}