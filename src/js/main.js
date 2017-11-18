/**
 * Created by hyd on 2017/11/18.
 */
import Vue from 'vue';
import App from '../component/App.vue';

new Vue({
    el: '#app',
    render(createNode){
        return createNode(App);
    }
});