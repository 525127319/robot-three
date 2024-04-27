const websocketConfig = {
    // ip: '192.168.14.80',
    ip: '127.0.0.1',
    port: '9000',
    // ip: '127.0.0.1',
    // port: '8000',
    retryTimes: 20
};

let websocketStatus = {
    open: 'open',
    close: 'close'
};

const msgType = {
  robotPosition: 'robotPosition',
  testerStatus: 'testerStatus',
  dutStatus: 'dutStatus',
};

const evn = {
    dubuger: true, // 是否输出日志
    reRender: 5000 // 多少次更新下界面
};

const curStatus = {
    Testing: 1,
    Pass: 2,
    Fail: 3,
    Testing_ZH: '测试中',
    Pass_ZH: '通过',
    Fail_ZH: '失败',
};

const line = {
    SMTLine: 'smt',
    ProductLine: 'product',
};

const stationData = {
    "product": [
        {
            'id': 1,
            'station_name': 'CAL',
            'first_pass_rate': 100
        },
        {
            'id': 2,
            'station_name': 'RF',
            'first_pass_rate': 100
        },
        {
            'id': 3,
            'station_name': 'WIFIBT',
            'first_pass_rate': 100
        },
        {
            'id': 4,
            'station_name': 'IDLE',
            'first_pass_rate': 100
        },
        {
            'id': 5,
            'station_name': 'ANT',
            'first_pass_rate': 100
        },
        {
            'id': 6,
            'station_name': 'CAT',
            'first_pass_rate': 100
        }
    ],
    "smt": [
        {
            'id': 1,
            'station_name': 'CAL',
            'first_pass_rate': 100
        },
        {
            'id': 2,
            'station_name': 'RF',
            'first_pass_rate': 100
        },
        {
            'id': 3,
            'station_name': 'WIFIBT',
            'first_pass_rate': 100
        },
        {
            'id': 4,
            'station_name': 'IDLE',
            'first_pass_rate': 100
        },
        {
            'id': 5,
            'station_name': 'ANT',
            'first_pass_rate': 100
        },
        {
            'id': 6,
            'station_name': 'CAT',
            'first_pass_rate': 100
        },
        {
            'id': 7,
            'station_name': 'AUDIO',
            'first_pass_rate': 100
        },
    ]
};
export {websocketConfig, websocketStatus, msgType, curStatus, evn, line,stationData};
