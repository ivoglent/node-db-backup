/**
 * Created by ivoglent on 5/29/18.
 */
const fs = require('fs');
const path = require('path');
export const Helper = {
    rmdir : function (dir) {
        let list = fs.readdirSync(dir);
        for(let i = 0; i < list.length; i++) {
            let filename = path.join(dir, list[i]);
            let stat = fs.statSync(filename);

            if(filename == "." || filename == "..") {
                // pass these files
            } else if(stat.isDirectory()) {
                // rmdir recursively
                this.rmdir(filename);
            } else {
                // rm fiilename
                fs.unlinkSync(filename);
            }
        }
        fs.rmdirSync(dir);
    }
};