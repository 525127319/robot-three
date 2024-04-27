import axios from "axios";
// import qs from "qs";

class AxiosHttp {
  init = () => {
    axios.defaults.timeout = 10000; //响应时间
    //配置请求头
    axios.defaults.headers.get["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    // axios.defaults.baseURL = "http://119.23.105.72:3001/api";
    axios.defaults.baseURL = "http://172.16.4.3:3001/api";
  };

  getBaseURL(){
      // return 'http://119.23.105.72:3001';
      return 'http://172.16.4.3:3001';
  }

  post(uri, data) {
    return axios
      .post(uri, data)
      .then(res => {
        // console.log("res:   " + res);
        return res.data;
      })
      .catch(error => {
        // console.log("error:   " + error);
      });
  }

  get(uri, data) {
    return axios
      .get(uri, data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        // console.log("error:   " + error);
        return error;
      });
  }
}

let httpUtil = new AxiosHttp();
httpUtil.init();
export default httpUtil;
