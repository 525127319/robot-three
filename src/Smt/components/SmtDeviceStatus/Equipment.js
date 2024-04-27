class Equipment{
    constructor(_machine){
        this.machine = _machine;
    }

    rotationY(message, direction){
        this.machine.rotationY(message, direction);
    }

    rotationZ(message, direction){
        this.machine.rotationZ(message, direction);
    }

    positionY(position, orientation){
        this.machine.positionY(position, orientation);
    }


    toLoadRail1(metatrial, _t, tester_mess, callback){
        this.rotationY({angle: _t.angle, action: _t.event});
        this.positionY({position: 158}, -1);
        const _this = this;
        setTimeout(() => {//做一个取料动作
            _this.positionY({position: 180}, -1);
            metatrial.reduce();
            if (callback)
                callback(tester_mess);
            // this.moveToTester();
        }, 300);
    }

    toLoadRail2(metatrial, _t, tester_mess, callback){
        this.rotationY({angle: _t.angle, action: _t.event});
        this.positionY({position: 158}, -1);
        const _this = this;
        setTimeout(() => {//做一个取料动作
            _this.positionY({position: 180}, -1);
            metatrial.reduce();
            if (callback)
                callback(tester_mess);
            //this.moveToTester();
        }, 300);
    }

}

export default Equipment;