/**
 * Created by hyd on 2017/11/18.
 */
import HomeComponent from '../component/home/home.vue';
import newsListComponent from '../component/news/news_list.vue';
import newsDetailsComponent from '../component/news/news_details.vue';
export default {
    routes: [
        {path: '/', redirect: '/index'},
        {path: '/index', component: HomeComponent},

        {path: '/news/list', component: newsListComponent},
        {path: '/news/details/:id', component: newsDetailsComponent}
    ]
}