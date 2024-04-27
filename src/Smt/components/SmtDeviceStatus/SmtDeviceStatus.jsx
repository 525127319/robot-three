import React, { Component } from "react";
// import AnimationUtil from '@/utils/AnimationUtil';
import smtDeviceAnimation from './SmtDeviceAnimation';
// import AxiosHttp from '@/utils/AxiosHttp.js';

let fonts=[
    {   name:'轨道1物料2',
        text:"物料编号2",
        size:18,
        index:1
    }
    ,
    {   name:'轨道1物料3',
        text:"物料编号3",
        size:18,
        index:1
    },
    {   name:'轨道1物料4',
        text:"物料编号4",
        size:18,
        index:1
    },
    {   name:'轨道1物料5',
        text:"物料编号5",
        size:18,
        index:1
    },
    {   name:'轨道2物料2',
        text:"物料编号2",
        size:18,
        index:1
    },
    {   name:'轨道2物料3',
        text:"物料编号3",
        size:18,
        index:1
    },
    {   name:'轨道2物料4',
        text:"物料编号4",
        size:18,
        index:1
    },
    {   name:'轨道2物料5',
        text:"物料编号5",
        size:18,
        index:1
    },
    {   name:'灰色物料1',
        text:"物料编号1",
        size:18,
        index:1
    },
    {   name:'灰色物料2',
        text:"物料编号2",
        size:18,
        index:1
    },
    {   name:'灰色物料3',
        text:"物料编号2",
        size:18,
        index:1
    },
    {   name:'完成绿色物料',
        text:"物料编号",
        size:18,
        index:1
    },
    {   name:'不良灰色物料完成',
        text:"物料编号",
        size:18,
        index:1
    },
    {   name:'绿色待上料',
        text:"物料编号",
        size:18,
        index:1
    }
]
export default class SmtDeviceStatus extends Component {
    static displayName = "SmtDeviceStatus";
    constructor(props) {
        super(props);
        this.state = {
            loading:true  
        };
    }

    // getStationStatus=()=>{ //获取工位状态
    //     AxiosHttp.
    //     // get('/station/status/line2')
    //     post('/smt/stationStatus')
    //     .then(
    //        this.handelStatus
    //     ).catch(error=>{
    //         console.log(error)
    //     })
    // }

    handelStatus=()=>{
        let stationStatus=[
           
        ];
        let res =[
            { ID:1 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M1' , StationID:'M1' , WorkstationStatus:0 },
            { ID:2 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M2' , StationID:'M2' , WorkstationStatus:0 },
            { ID:3 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M3' , StationID:'M3' , WorkstationStatus:0 },
            { ID:4 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M4' , StationID:'M4' , WorkstationStatus:0 },
            { ID:5 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M5' , StationID:'M5' , WorkstationStatus:0 },
            { ID:6 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M6' , StationID:'M6' , WorkstationStatus:0 },
            { ID:7 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M7' , StationID:'M7' , WorkstationStatus:0 },
            { ID:8 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M8' , StationID:'M8' , WorkstationStatus:0 },
            { ID:9 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M9' , StationID:'M1' , WorkstationStatus:0 },
            { ID:10 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M10' , StationID:'M2' , WorkstationStatus:0 },
            { ID:11 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M11' , StationID:'M3' , WorkstationStatus:0 },
            { ID:12 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M12' , StationID:'M4' , WorkstationStatus:0 },
            { ID:13 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M13' , StationID:'M5' , WorkstationStatus:0 },
            { ID:14 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M14' , StationID:'M6' , WorkstationStatus:0 },
            { ID:15 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M15' , StationID:'M7' , WorkstationStatus:0 },
            { ID:16 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M16' , StationID:'M8' , WorkstationStatus:0 },
        ]
        if(res.length){
            res.forEach(item =>{
                let items={
                    number:'',
                    name:'',
                    status:''
                }
                // items.number=item.rows[0].Station
                // items.name=item.rows[0].StationName
                items.number=item.WorkstationOrder
                items.name=item.StationID
                // switch(item.WorkstationStatus){
                //     case 0:items.status='normal'
                //         break;
                //     case 1:items.status='repair'
                //         break;
                //     case 2:items.status='error'
                //         break;
                //     default:
                //         break;
                // }
                switch(item.WorkstationStatus){
                    case 0:items.status='unEnable'
                        break;
                    case 1:items.status='enable'
                        break;
                    default:
                        break;
                }

                stationStatus.push(items);
            
            })
            this.customFonts(stationStatus)
            smtDeviceAnimation.initStationStatus(stationStatus);
        }
       
    }
    customFonts=(data)=>{
        data.forEach(item=>{
            if(Object.keys(item).length===4){
                smtDeviceAnimation.initFont(item.text,item.name,item.size ,item.index)
            }else{
                smtDeviceAnimation.initFont(item.name,item.number,item.size=18 )
            }
        })
    }
    initObj=()=> {
        smtDeviceAnimation.initdata();
        smtDeviceAnimation.initMetarial1();
        smtDeviceAnimation.initMachine1();
        smtDeviceAnimation.initMachine2();
        smtDeviceAnimation.initMachine3();
        this.customFonts(fonts)
        setInterval(() => {
            // if( !document.hidden && window.location.hash ==="#/smt"){
                // smtDeviceAnimation.getSmtTesterData();
                smtDeviceAnimation.initAction(); 
                // this.getStationStatus() //更新工位名称和状态
                this.handelStatus()
            // } 
        },3000);
       
    }
 
    componentDidMount() {
        smtDeviceAnimation.init('animation', '/models/smt20180821.fbx').then((()=>{
            this.initObj();
            this.setState({loading:false})
        }));
    }


    render() {
        return (
            <section className='product-main three-muodle'>
                {this.state.loading &&  <div className='loading-moudle'></div>}
                <div id="animation" style={{height:'550px'}}></div>
            </section>
        )
    }

}