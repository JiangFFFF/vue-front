//封装axios
import axios from 'axios'
import cookie from 'js-cookie'
import { MessageBox,Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
baseURL: 'http://localhost:9001', // api的base_url timeout: 20000 // 请求超时时间
})

//第三步：创建拦截器
//每次请求中使用拦截器
service.interceptors.request.use(
    config => {
        //debugger
        //判断cookie中是否有名称叫 guli_token的数据
        if (cookie.get('guli_token')) {
            //把获取到的cookie值放到header中,主要放在header中是为了调接口使用
            config.headers['token'] = cookie.get('guli_token');
        }
        return config
    },
    err => {
        return Promise.reject(err);
    }
)

export default service

