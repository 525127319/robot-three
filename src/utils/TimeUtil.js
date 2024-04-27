import moment from "moment";
class TimeUtil{

    //获取当天开始时间， 返回long
    getDayStartUnixTime(){
        let now = moment().hour(0).minute(0).second(0);
        let curstartTime = moment(now).format('X');
        return curstartTime;
    }

    //获取指定日期结束时间， 返回long
    getDayEndUnixTime(timeLong){
        let _s = timeLong.toString();
        if (_s.length <= 10){
            timeLong = timeLong * 1000;
        }
        let endTime = moment(timeLong).hour(23).minute(59).second(59);
        let dateEntTime = moment(endTime).format('X');
        return dateEntTime;
    }


    //获取当前的时间， 返回long
    geCurUnixTime(){
        let now = moment();
        let curstartTime = moment(now).format('X');
        return curstartTime;
    }


    /**
     * 自定义格式化日期
     * 目前项目中有两种格式时间戳 10位、13位数字时间戳
     * @param {*} timeLong 传入Long型的时间
     * @param {*} format 格式
     */
    format(timeLong, format){
        let _s = timeLong.toString();
        if (_s.length <= 10){
           timeLong = timeLong * 1000;
        }
        let _m = moment(timeLong);
        let d =  _m.format(format);
        return d;
    }

    /**
     * 传入Long型的时间, 返回  YYYY-MM-DD HH:mm:ss格式
     */
    formatDate(timeLong) {
        return this.format(timeLong, 'YYYY-MM-DD HH:mm:ss');
    }


    //根据指定格式来格式化日期
    formatDateByFormat(sDate, formate){
        return moment(sDate).format(formate);
    }

    /**
     * 根据指定格式，返回指定日期
     * @param {*} format 日期格式
     */
    getCurDate(format){
        return moment().format(format);
    }

}

export default new TimeUtil();
