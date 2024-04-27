import React, { Component } from "react";
import AxiosHttp from "@/utils/AxiosHttp";
import AnimateUtils from "@/utils/Animate";
import  { line, curStatus } from "@/utils/Config";
// import Swiper from 'swiper/dist/js/swiper.js'
// import 'swiper/dist/css/swiper.min.css'

const INTERVAL = 5000;
const key =0;
export default class SmtDetectionLogs extends Component{
    static displayName = "SmtDetectionLogs";
    constructor(props) {
        super(props);
        this.state = {
            key:0,
            imgWd:0,
            testerLogs:[],
        };
        this.getSmtTesterData();
    }

    componentDidMount() {
        // var mySwiper = new Swiper('.swiper-container',{
        //     loop: true,
        //     slidesPerView: 'auto',
        //     loopedSlides: 10,
        //     autoplay: true,//可选选项，自动滑动
        //   })
        this.timer = setInterval(() => {
            if(window.location.hash==="#/smt"&& !document.hidden){
                this.getSmtTesterData();
               
            }
        }, INTERVAL);

        this.time =setInterval(() =>{
            this.autoPlay();
        },2000)
    }

    autoPlay(){
        let ul =document.getElementById('ul');
        let ol =document.getElementById('ol');
        let foot =document.getElementById('foot');
        let liArr =ul.children;
        // let ulNewLi = liArr[0].cloneNode(true);
        // ul.appendChild(ulNewLi);
        let imgWidth =liArr[0].offsetWidth+16;
        this.state.key++;
         if(this.state.key>liArr.length || this.state.key*imgWidth >= foot.offsetWidth ){
            ul.style.left = 0;
            this.setState({
                key : 1
            })
        }
        AnimateUtils.animate(ul,-this.state.key*imgWidth); 

    }


   
    componentWillUnmount() {
        clearInterval(this.timer);
        clearInterval(this.time);
    }
   
   

    // 获取工位数据
    getSmtTesterData = () => {
        AxiosHttp
            // .get('/tester1/tester1logs/' + line.SMTLine)
            .post('/smt/testLogs')
            .then(this.handleTesterdata);
    };

    handleTesterdata = function(response) {
        if(response.ok===1&&response.value.length){
            this.setState({
                testerLogs:response.value
            },()=>{
                // console.log(this.state.testerLogs)
            } )
        }
        // let testerLogs = this.state.testerLogs;
 
        // if(!response.value || response.value.rows.length === 0) {
        //     return;
        // }
        // if(testerLogs.length >= 30) {
        //     testerLogs.splice(0,response.value.rows.length);
        //     response.value.rows.forEach(item => {
        //         testerLogs.push(item);
        //     });
        // }else {
        //     response.value.rows.forEach(item => {
        //         testerLogs.push(item);
        //     });
        // }
        // this.setState({
        //     testerLogs:testerLogs
        // } )
    }.bind(this);

    renderTableContent = () => {
        return this.state.testerLogs.map((item, index) => {

            return (
                <li key={index} ref="li"  className="swiper-slide">
                    <p>
                        <span>编号</span><span>{item.WorkstationNo}</span>
                    </p>
                    <p>
                        <span>状态</span><span>{item.CurStatus}</span>
                    </p>
                    <p>
                        <span>完成数</span><span>{item.FinishedNum}</span>
                    </p>
                    <p>
                        <span>良品数</span><span>{item.YieldNumber}</span>
                    </p>
                    <p>
                        <span>次品数</span><span>{item.Inferior}</span>
                    </p>
                </li>
            )
        })
    };

    render() {
        return (
            <footer id="foot" className="swiper-container">
                <ul id="ul" className="swiper-wrapper">
                    {this.renderTableContent()}
                </ul>
            </footer>
        )
    }
}