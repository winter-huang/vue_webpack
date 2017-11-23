/**
 * Created by hyd on 2017/11/18.
 */
//导入Vue框架
import Vue from 'vue';

//导入根组件
import App from '../component/App.vue';

//导入公共组件
import Common from '../component/common';
Vue.use(Common);

//导入date过滤器
import Filter from '../filter';
Vue.use(Filter);

//导入less,样式初始化
import baseLess from '../less/base.less';

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

//导入api_config文件
import apiConfig from './api_config';
Vue.prototype.api = apiConfig;

//导入vue-preview插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

//导入vue-router插件
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//导入路由配置文件
import routerConfig from '../router';

//导入Vuex插件
import Vuex from 'vuex';
Vue.use(Vuex);
//导入vuex配置文件
import store from '../vuex';

new Vue({
    el: '#app',
    render(createNode){
        return createNode(App);
    },
    //vue-router插件 实例化
    router: new VueRouter(routerConfig),
    //vuex插件 实例化
    store: new Vuex.Store(store)
});


