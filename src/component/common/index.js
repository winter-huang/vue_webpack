/**
 * Created by hyd on 2017/11/18.
 */
import HeaderComponent from './header.vue';
import FooterComponent from './footer.vue';
import CommentComponent from '../comment/comment.vue';

export default {
    install(Vue){
        Vue.component('app-header', HeaderComponent);
        Vue.component('app-footer', FooterComponent);
        Vue.component('app-comment', CommentComponent);
    }
}