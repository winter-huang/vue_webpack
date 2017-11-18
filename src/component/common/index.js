/**
 * Created by hyd on 2017/11/18.
 */
import HeaderComponent from './header.vue';
import FooterComponent from './footer.vue';

export default {
    install(Vue){
        Vue.component('app-header', HeaderComponent);
        Vue.component('app-footer', FooterComponent);
    }
}