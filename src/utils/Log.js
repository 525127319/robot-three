let defaultLavel = 0;
class Log{
    constructor(lavel){
        this.lavel = lavel;
    }
    debug(info){
        if (defaultLavel !== this.lavel){
            return;
        }

        console.debug(info);
    }


}

export default new Log(0);