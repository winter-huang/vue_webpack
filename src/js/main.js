/**
 * Created by hyd on 2017/11/18.
 */
import Vue from 'vue';
import App from '../component/App.vue';

//导入mint-ui
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.min.css';
Vue.use(MintUi);

//导入mui
import 'mui/dist/css/mui.min.css';
//mui扩展字体图标
import 'mui/examples/hello-mui/css/icons-extra.css';

//导入axios插件
import axios from 'axios';
Vue.prototype.axios = axios;

//导入vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//导入路由配置文件
import routerConfig from '../router';

//导入公共组件
import Common from '../component/common';
Vue.use(Common);

//导入api_config文件
import apiConfig from './api_config';
Vue.prototype.api = apiConfig;

new Vue({
    el: '#app',
    render(createNode){
        return createNode(App);
    },
    router: new VueRouter(routerConfig)
});