import React, { Component } from "react";
import echarts from "echarts";
import AxiosHttp from "@/utils/AxiosHttp";
import { line, stationData } from "@/utils/Config";

const INTERVAL = 5000;

export default class SmtDataStatistics extends Component{
    static displayName = "SmtDataStatistics";
    constructor(props) {
        super(props);
        this.state = {
            statistics: {
                id: '',
                type: '',
                factory_name: '北富',
                product_name: 'SMT板测',
                line_name: '',
                output_count: 0,
                input_count: 0,
                order_no: '板测线看板',
                uph: 0,
                yield_rate: 0,
                first_pass_rate: 0,
                time: 0,
            },
            yield_count: 0,
            failure_count: 0,
            stationData: stationData.smt, // 工站line2
            datetime: ''
        };
        this.echartY = null;
        this.echartF = null;
        this.optionY = null;
        this.optionF = null;
        this.getSmtLineData();
        this.getSmtStationData();
 
    }

    componentWillMount() {
        this.optionY = {
            // tooltip: {
            //   trigger: 'item',
            //   formatter: "{b} : {c} ({d}%)"
            // },
            series: [{
                type: 'pie',
                radius: ['80%', '70%'],
                center:['50%','50%'],
                label: {
                    normal: {
                        show : false //不显示指引线
                    }
                },
                data: [{
                    value: 100,
                    name: '良品率',
                    label: {
                        normal: {
                            position: 'center',
                            show: true,
                            formatter: '{d} %',
                            textStyle: {
                                fontSize: 14
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#0072E9'
                        },
                        emphasis: {
                            color: '#0072E9'
                        }
                    },
                }, {
                    value: 0,
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: '#aaa'
                        },
                        emphasis: {
                            color: '#aaa'
                        }
                    },
                    hoverAnimation: false
                }]
            }]
        };
        this.optionF = {
            // tooltip: {
            //   trigger: 'item',
            //   formatter: "{b} : {c} ({d}%)"
            // },
            series: [{
                type: 'pie',
                radius: ['80%', '70%'],
                center:['50%','50%'],
                label: {
                    normal: {
                        show : false //不显示指引线
                    }
                },
                data: [{
                    value: 100,
                    name: '一次通过率',
                    label: {
                        normal: {
                            position: 'center',
                            show: true,
                            formatter: '{d} %',
                            textStyle: {
                                fontSize: 14
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#0072E9'
                        },
                        emphasis: {
                            color: '#0072E9'
                        }
                    },
                }, {
                    value: 0,
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: '#aaa'
                        },
                        emphasis: {
                            color: '#aaa'
                        }
                    },
                    hoverAnimation: false
                }]
            }]
        };
    }

    componentDidMount() {
        this.echartY = echarts.init(document.getElementById('smt-persent'));
        this.echartF = echarts.init(document.getElementById('smt-persent-bot'));
        window.addEventListener("resize",()=>{              
            this.echartY.resize();
            this.echartF.resize();
        });
        this.timer = setInterval(() => {
            if(!document.hidden&&window.location.hash==='#/smt'){
                this.getSmtLineData();
                this.getSmtStationData();
            }
        }, INTERVAL);
        this.echartY.setOption(this.optionY);
        this.echartF.setOption(this.optionF);

        this.timer1 = setInterval(() => {
            if(!document.hidden&&window.location.hash==='#/smt'){
                this.getDateTime();
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        clearInterval(this.timer1);
    }

    // 获取line线数据
    getSmtLineData = () => {
        AxiosHttp
            // .get('/line/findAll/' + line.SMTLine)
            .post('/smt/getStatisticsData')
            .then(this.handleLinedata);
    };

    getSmtStationData = () => {
        AxiosHttp
            // .get('/station/findAll/' + line.SMTLine)
            .post('/smt/stationOncePassedRate')
            .then(this.handleStationdata);
    };

    handleStationdata = function(response) {
        if(!response.value) {
            return;
        }
        this.setState({
            stationData: response.value
        });
    }.bind(this);

    renderStationdata = () => {
        return this.state.stationData.map((item,index) => {
            return (
                <li key={index}>
                    <span className="nav-data">{item.StationOncePassedRate}%</span>
                    <p className="progress">
                        <i style={{height: item.StationOncePassedRate + '%'}}></i>
                    </p>
                    <span className="nav-text">{item.StationGroup}</span>
                </li>
            )
        });
    };

    handleLinedata = function(response) {
        if(response.value && response.value.length !== 0) {
            let output_count = response.value[0].OutCount;
            let yield_count = (response.value[0].OutCount * (response.value[0].Yield/100)).toFixed(0);
            let failure_count = output_count - yield_count;
            this.setState({
                statistics: response.value[0],
                yield_count: yield_count,
                failure_count: failure_count
            });
            this.optionY.series[0].data[0].value = response.value[0].Yield;
            this.optionF.series[0].data[0].value = response.value[0].LineOncePassedRate;
            this.optionY.series[0].data[1].value = 100 - response.value[0].Yield;
            this.optionF.series[0].data[1].value = 100 - response.value[0].LineOncePassedRate;
        }
        this.echartY.setOption(this.optionY);
        this.echartF.setOption(this.optionF);
    }.bind(this);

    getDateTime() {
        let date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.date = date.getDate();
        this.day = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()];
        this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        let  currentTime = this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second  + " " +  this.day;
        this.setState({
            datetime: currentTime,
        });
    }

    render() {
        let { statistics, yield_count, failure_count, datetime } = this.state;
        return (
            <header className="spectaculars-top">
                <h1>
                    {/* <span>{statistics.WorkOrderNo}</span> */}
                    <span>板测线看板</span>
                    <p>{datetime}</p>
                    {/* <strong>
                         <i className="icon-dili"></i>
                      {statistics.FactoryName} 
                        北京富士康
                    </strong> */}
                </h1>
                <ul className="product-top" >
                    <li >
                        <div>
                            <span>完成数</span>
                            <p className="color-finish">{statistics.OutCount}</p>
                        </div>
                        <div>
                            <span>UPH</span>
                            <p className="color-finish">{statistics.Uph}</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>良品数</span>
                            <p className="color-g">{yield_count}</p>
                        </div>
                        <div>
                            <span>次品数</span>
                            <p className="color-r">{failure_count}</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>良品率</span>
                            <div className="cent-canvas" id="smt-persent"></div>    
                        </div>
                        <div>
                            <span>一次通过率</span>
                            <div className="cent-canvas" id="smt-persent-bot"></div>
                        </div>
                    </li>
                    <li>
                         <div>
                            <span>一次通过率</span>
                            <ul className="product-nav">
                                {this.renderStationdata()}
                            </ul>
                        </div>
                    </li>
                </ul>
            </header>
        )
    }
}