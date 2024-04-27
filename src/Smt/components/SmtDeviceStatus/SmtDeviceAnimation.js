import AnimationUtil from '../../../utils/AnimationUtil';
import RailMetarial from '../../../utils/RailMetarial';
import Machine from '../../../utils/Machine';
import Machine1 from "./Machine1";
import Machine2 from "./Machine2";
import Machine3 from "./Machine3";
import * as THREE from 'three'

// import AxiosHttp from "@/utils/AxiosHttp";
// import  { line } from "@/utils/Config";
let loadMuodle=null

let animationUtil = new AnimationUtil();
// let sixMachine1Type = { 'retrieve': 'retrieve', 'retrieveDown': 'retrieveDown', 'retrieveUp': 'retrieveUp', 'load': 'load', 'loadUp': 'loadUp', 'loadDown': 'loadDown' };
let metarialMap = new Map();
let machineMap = new Map();
let actionData=[
    {count:0},
    {count:0},
    {count:0},
]
class SmtDeviceAnimation{

    initdata() {
        this.machine1 = new Machine1(this);
        this.railMetarial = this.getMetrail('绿色待上料');
       
        this.machine2 = new Machine2(this);
        this.rail1Metarial3 = this.getMetrail('轨道1物料3');
        this.rail2Metarial3 = this.getMetrail('轨道2物料3');

        this.machine3 = new Machine3(this);
        this.rail1Metarial5 = this.getMetrail('轨道1物料5');
        this.rail2Metarial5 = this.getMetrail('轨道2物料5');
        this.defectiveMetarial3 = this.getMetrail('灰色物料3');
    }


    initAction(){
        setInterval(()=>{ 
            // if(!document.hidden&&window.location.hash==='#/smt'){
                // AxiosHttp.post('/smt/actionData')
                // .then(res=>{this.handleActionData(res)})
                // .catch(err=>{
                //     console.log(err)
                // })

                this.railMetarial.add({start:1,target:'M8'});
                this.railMetarial.add({start:'M8',target:1});
                this.rail1Metarial3.add({start:1,target:'M8'});
                this.rail1Metarial3.add({start:'M8',target:1});
                this.rail1Metarial5.add({start:1,target:1});
                this.defectiveMetarial3.add({start:1,target:2});

                this.rail2Metarial3.add({start:'M6',target:2});
                this.rail1Metarial5.add({start:1,target:2});
                this.rail2Metarial5.add({start:2,target:2});
                this.defectiveMetarial3.add({start:1,target:2});
  
            // }
        },3000)
       
    }

    handleActionData(res){
        let result=res.value
        if(res.ok===1&&result.length){
            result.map((item)=>{
               if(/l/i.test(item.rows[0].StartStationNo)){
                item.rows[0].StartStationNo=[...item.rows[0].StartStationNo][1]*1
               }
               if(/l/i.test(item.rows[0].TargetStationNo)){
                item.rows[0].TargetStationNo=[...item.rows[0].TargetStationNo][1]*1
               }
               return item
            })
            
            result.forEach((item,index)=>{
                let data=item.rows[0]
                switch(data.CellName){
                    case "Cell1":
                    if(item.count !==actionData[0].count ){
                        this.railMetarial.add({start:data.StartStationNo,target:data.TargetStationNo}) 
                    }
                    break;
                    case 'Cell2':
                    if(item.count !==actionData[1].count){
                        if(data.StartStationNo===1||data.TargetStationNo===1){
                            this.rail1Metarial3.add({start:data.StartStationNo,target:data.TargetStationNo})     
                        }else if(data.StartStationNo===2||data.TargetStationNo===2||data.TargetStationNo===3){
                            this.rail2Metarial3.add({start:data.StartStationNo,target:data.TargetStationNo})  
                        }
                    }   
                    break;
                    default :
                    if(item.count !==actionData[2].count){
                        if(data.StartStationNo===1 ){
                            this.rail1Metarial5.add({start:data.StartStationNo,target:data.TargetStationNo});
                        }else if(data.StartStationNo===2 ){
                            this.rail2Metarial5.add({start:data.StartStationNo,target:data.TargetStationNo});
                        }else{
                            this.defectiveMetarial3.add({start:data.StartStationNo,target:data.TargetStationNo});
                        }
                    }
                    break;
                }
            })
               
            actionData=result;  
          
        }   
    }

    // //获取工位数据
    // getSmtTesterData = () => {
    //     AxiosHttp
    //         // .get('/tester1/testData/line2')
    //         .post('/smt/testLogs')
    //         .then(this.handleTesterdata);
    // };

    // handleTesterdata = function(response) {
    //     console.log(response,'获取工位数据');
    //     let res = response.value;
    //     if(!response.value || response.value.length === 0) {
    //         return;
    //     }
    //     if(res.Result === 1) {// 0：机器人3 NG轨道上料，1：机器人1上料， 2：轨道1上料，3：轨道2上料，4：轨道1下料，5：轨道2下料，6：NG轨道下料
    //         this.railMetarial.add(res.TesterName);
    //     } else if(res.Result === 2 || res.Result === 3 || res.Result === 0) { //上料
    //         if(res.CellName === 'cell2') {
    //             if(res.Result === 2) {// 轨道1
    //                this.rail1Metarial3.add(res.TesterName);
    //             } else {// 轨道2
    //                this.rail2Metarial3.add(res.TesterName);
    //             }
    //         } else if(res.CellName === 'cell3') {
    //             if(res.Result === 2) {// 轨道1
    //                 this.rail1Metarial5.add(res.TesterName);
    //             } else if(res.Result === 3) {// 轨道2
    //                 this.rail2Metarial5.add(res.TesterName);
    //             } else if(res.Result === 0) {// 机器人3从NG轨道上料
    //                 this.defectiveMetarial3.add(res.TesterName);
    //             }
    //         }
    //     } else if(res.Result === 4 || res.Result === 5 || res.Result === 6) {//下料
    //         if(res.CellName === 'cell1') {
    //             this.machine1.moToRail({name: res.TesterName,result:res.Result})
    //         } else if(res.CellName === 'cell2') {
    //             this.machine2.moToRail({name: res.TesterName,result:res.Result})
    //         }
    //     }
    // }.bind(this);

    //初始化第一个物料
    initMetarial1() {
        let railMetarial = this.getMetrail('绿色待上料');
        railMetarial.disable();
        setInterval(() => {
            railMetarial.add();
        },3000);
    }

    //初始化第一个机器人
    initMachine1() {
        let machine1 = new Machine1(this);
        let railMetarial = metarialMap.get('绿色待上料');
        // let randomNum = Math.round(Math.random());
        // Machine1.toLoadRail1();
        // 上一个工站，会触发添加事件
        // if(randomNum) {
            railMetarial.addEventListener(railMetarial.event.add, event => {
                //驱动四轴机器人1来取料
                if(/M/i.test(event.message.tester_mess.start)){
                    machine1.moToRail(event.message.tester_mess)
                }else{
                    machine1.toLoadRail1(railMetarial,event.message.tester_mess);
                }
            });
        // } else {
            // railMetarial.addEventListener(railMetarial.event.add, event => {
            //     machine1.toLoadRail2(railMetarial,event.message.tester_mess);
            // });
        // }
      
    }

    //初始化第二个机器人
    initMachine2() {
        let machine2 = new Machine2(this);
        let rail1Metarial3 = metarialMap.get('轨道1物料3');
        let rail2Metarial3 = metarialMap.get('轨道2物料3');
       
        // Machine1.toLoadRail1();
        //上一个工站，会触发添加事件
        rail1Metarial3.addEventListener(rail1Metarial3.event.add, event => {
            //驱动四轴机器人2来取料
            if(/M/i.test(event.message.tester_mess.start)){
                machine2.moToRail(event.message.tester_mess)
            }else{
                machine2.toLoadRail1(rail1Metarial3,event.message.tester_mess);
            }
        });

        rail2Metarial3.addEventListener(rail2Metarial3.event.add, event => {
            if(/M/i.test(event.message.tester_mess.start)){
                machine2.moToRail(event.message.tester_mess)
            }else{
                machine2.toLoadRail2(rail2Metarial3,event.message.tester_mess);
            } 
        });
     
       
    }

    //初始化第三个机器人
    initMachine3() {
        let machine3 = new Machine3(this);
        let rail1Metarial5 = metarialMap.get('轨道1物料5');
        let rail2Metarial5 = metarialMap.get('轨道2物料5');
        let defectiveMetarial3 = metarialMap.get('灰色物料3');

        // Machine1.toLoadRail1();
        //上一个工站，会触发添加事件
        rail1Metarial5.addEventListener(rail1Metarial5.event.add, event => {
            //驱动四轴机器人3来取料
            machine3.toLoadRail1(rail1Metarial5,event.message.tester_mess);
           
        });

        rail2Metarial5.addEventListener(rail2Metarial5.event.add, event => {
            machine3.toLoadRail2(rail2Metarial5,event.message.tester_mess) 
           
        });

        defectiveMetarial3.addEventListener(defectiveMetarial3.event.add, event => {
            machine3.toLoadRail3(defectiveMetarial3,event.message.tester_mess);
        });
       
    }

    init(containerId, modelUrl) {
        animationUtil.init(containerId);
        //加载模型
        let promise = animationUtil.loadFbx(modelUrl);
        return promise.then((object) => {
            loadMuodle=object
            //調整位置
            object.position.y =100;
            object.position.x = -500;
            object.position.z=200;
            // object.rotateX(-(Math.PI/2)*0.2);
            object.scale.set(1.2,1.2,1.2);
            this.model = object;
            this.disableAllMetarial();
            this.animate();
            this.times = 0;
            this.initFont('良品数','良品数',18);
            this.initFont('不良数','不良数',18);
           
        }).catch(error => {
            console.error('load model:  ' + JSON.stringify(error));
        });
    }
    initFont(text,group,size,mes){ //修改文本
        let font = animationUtil.loadFont();
                font.then((obj)=>{
                let g = new THREE.TextGeometry(text,{
                    // 设定文字字体，
                    font:obj,
                    //尺寸
                    size:size||20,
                    //厚度
                    height:4,
                    curveSegments: 5
                });
                //计算边界，暂时不用管
                g.computeBoundingBox();
                //3D文字材质
                let m = new THREE.MeshBasicMaterial();
                let mesh = new THREE.Mesh(g,m);
            
                    // 加入到场景中
                let   fontGroup = animationUtil.getMeshByName(loadMuodle,group);
                        if(mes){
                           
                            fontGroup.children[0].visible = false;
                            mesh.position.copy(fontGroup.children[0].position);
                            mesh.rotation.x=(Math.PI)/-2
                            mesh.geometry.center()
                            mesh.material.color.copy(fontGroup.children[0].material.color);
                            fontGroup.add(mesh);  
                        }else{
                            fontGroup.children[0].visible = false;
                            mesh.position.copy(fontGroup.children[0].position);
                            mesh.rotation.copy(fontGroup.children[0].rotation);
                            mesh.scale.copy(fontGroup.children[0].scale);
                            mesh.material.color.copy(fontGroup.children[0].material.color);
                            fontGroup.children.pop();
                            fontGroup.add(mesh);  
                        }
   
                })
     
       
    }
    

    initStationStatus(status){ //初始化个检测工位的状态
        status.forEach(item=>{
            this.initFont(item.number,item.number,18,item.index=0)
             if(item.status==="unEnable"){
                this.getMetrail(item.number).meterial.children[0].material.color={r: 0.09137055837563457, g: 0.09137055837563457, b: 0.09137055837563457}
             }else if(item.status==="enable"){
                // this.getMetrail(item.number).meterial.children[0].material.color={r: 0.7902532316860755, g: 0.2630827112431621, b: 0.2630827112431621}
                this.getMetrail(item.number).meterial.children[0].material.color={r: 8.397118308078596e-17, g: 0.7563451776649747, b: 0.1512690355329951}
             }
            // else{
            //     this.getMetrail(item.number).meterial.children[0].material.color={r: 8.397118308078596e-17, g: 0.7563451776649747, b: 0.1512690355329951}
            //  }
        })
       
    }


    //隐藏掉所有物料，被驱动。
    disableAllMetarial() {
        for (let i = 1; i < 3; i++) {//2条轨道
            for (let y = 2; y < 6; y++) {
                let _t = this.getMetrail('轨道' + i + '物料' + y);
                _t.disable();
            }
        }
        for (let i = 1; i <  4; i++) {
            let _t = this.getMetrail('灰色物料' + i);
            _t.disable();
        }
    }

    //渲染动画
    animate = function () {
        // this.animation();
        //this.times++;
        //if (this.times < 20)
        // setInterval(() => {
        //     animationUtil.renderOnly();
        // }, 1000);
        animationUtil.render(this.animate);
    }.bind(this);

    getMetrail(name) {
        if (metarialMap.has(name)) return metarialMap.get(name);
        let _m = animationUtil.getMeshByName(this.model, name);
        _m = new RailMetarial(_m, animationUtil, name);
        metarialMap.set(name, _m);
        return _m;
    }

    getMachine(name) {
        if (machineMap.has(name)) return machineMap.get(name);
        let _m = animationUtil.getMeshByName(this.model, name);
        _m = new Machine(_m, animationUtil, name);
        machineMap.set(name, _m);
        return _m;
    }

    getMeshByName(name) {
        return animationUtil.getMeshByName(this.model, name);
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new SmtDeviceAnimation();