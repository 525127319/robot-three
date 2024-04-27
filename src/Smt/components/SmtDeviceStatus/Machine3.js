//测试摄象头
import Equipment from './Equipment';
let rails = [
    { 'name': 'loadRail2', angle: -0.2 },//发布四轴机器人3抓取事件
    { 'name': 'loadRail1', angle: 0.2 },//发布四轴机器人3抓取事件
    { 'name': 'loadRail3', angle: 0 },//发布四轴机器人3抓取事件
    { 'name': 'downRail2', angle: -1.5, index: 1, 'event': 'toFinish', /**下料事件*/ },
    { 'name': 'downRail1', angle: 1.5, index: 2, 'event': 'toDefectiveFinish'/**下料事件*/ },
];
let map = new Map();
rails.forEach(rail => {
    map.set(rail.name, rail);
});

let machine = null, smtAnimation = null, index = 0;
class Machine3 extends Equipment {
    constructor(_smtAnimation) {
        machine = _smtAnimation.getMachine('白色机器人');
        super(machine);
        smtAnimation = _smtAnimation;
        this.addEvent();
    }

    //让6轴机器人转到下料口
    toNextStation(tester_name) {
        if (index === 1 || index === 2) {
            index = 3;
        } else {
            index = 4
        }
        let t = rails[index];
        super.rotationY({ angle: t.angle, action: t.event, name: t.name });//发布事件，让下
        // if (index === 2) {//切换轨道
        //     index = 3;
        // } else {
        //     index = 2;
        // }
    }

    toLoadRail1(metatrial,tester_name) {
        index = 1;
        let _t = map.get('loadRail1');
        this.getMetarial(_t, metatrial);
    }

    toLoadRail2(metatrial,tester_name) {
        index = 2;
        let _t = map.get('loadRail2');
        this.getMetarial(_t, metatrial);
    }

    toLoadRail3(metatrial,tester_name) {
        index = 3;
        let _t = map.get('loadRail3');
        this.getMetarial(_t, metatrial,tester_name);
    }

    getMetarial(_t, metatrial,tester_name) {
        this.rotationY({ angle: _t.angle, action: _t.event });
        this.rotationZ({ angle: 0.3 }, 1);
        const _this = this;
        setTimeout(() => {//做一个取料动作
            _this.rotationZ({ angle: 0.1 }, -1);
            metatrial.reduce();
            this.toNextStation(tester_name);
        }, 500);
    }

    addEvent() {
        let _metarial25 = smtAnimation.getMetrail('轨道2物料5');
        let _metarial15 = smtAnimation.getMetrail('轨道1物料5');
        let _metarial28 = smtAnimation.getMetrail('完成绿色物料');
        let _metarial18 = smtAnimation.getMetrail('不良灰色物料完成');
        let _machineMetarial3 = smtAnimation.getMetrail('夹起的物料');
        _metarial25.disable()
        _machineMetarial3.disable();
        _metarial28.disable();
        _metarial18.disable();
        machine.addEventListener(machine.event.rotationY, event => {
            let message = event.message;
            let action = message.action;
            _metarial28.disable();
            _metarial18.disable();
            _machineMetarial3.block();

            if ('toFinish' === action) {//监听物料到达下一个出口
                _metarial28.block();
                _machineMetarial3.disable();
                // let _index = index % 2 === 0 ? 3 : 4;
                // let _rail = rails[_index];
                // if (_rail.index === 2) {
                //     _metarial28.add();
                //     _metarial25.move(_metarial25.distance.metarial5To8);//滑到下一个上料口
                // } else {
                //     _metarial18.add();
                //     _metarial15.move(_metarial15.distance.metarial5To8);//滑到下一个上料口
                // }
            } else if('toDefectiveFinish' === action) {
                _metarial18.block();
                _machineMetarial3.disable();
            }
        });


        //监听第6块物料到达位置，如果到了，第8个物料+1，第6块物料重置，并不显视
        _metarial25.addEventListener(_metarial25.event.arriveTarget, event => {
            // _metarial28.block();
            _metarial25.disable();
            _metarial25.reset();
        });

        _metarial15.addEventListener(_metarial15.event.arriveTarget, event => {
            // _metarial18.block();
            _metarial15.disable();
            _metarial15.reset();
        });
    }
}

export default Machine3;