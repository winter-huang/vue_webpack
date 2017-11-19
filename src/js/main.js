/**
 * Created by hyd on 2017/11/18.
 */
import Vue from 'vue';
import App from '../component/App.vue';

//导入date过滤器
// import filters from '../filter';
// filters.myGetDate();
Vue.filter('date', function (time) {
    var date = new Date(time);
    return `${ date.getFullYear() }
            - ${ date.getMonth() - 0 + 1 > 9 ? date.getMonth() - 0 + 1 : '0' + (date.getMonth() - 0 + 1) }
            - ${ date.getDate() > 9 ? date.getDate() : '0' + date.getDate() }`;
})

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

//导入vue-preview插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

new Vue({
    el: '#app',
    render(createNode){
        return createNode(App);
    },
    router: new VueRouter(routerConfig)
});