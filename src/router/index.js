/**
 * Created by hyd on 2017/11/18.
 */
import HomeComponent from '../component/home/home.vue';
import newsListComponent from '../component/news/news_list.vue';
import newsDetailsComponent from '../component/news/news_details.vue';

import imagesListComponent from '../component/picture/images_list.vue';
import imagesDetailsComponent from '../component/picture/image_details.vue';

import goodsListComponent from '../component/goods/goodsList.vue';
import goodsDetailsComponent from '../component/goods/goodsDetails.vue';

export default {
    routes: [
        {path: '/', redirect: '/index'},
        {path: '/index', component: HomeComponent},

        {path: '/news/list', component: newsListComponent},
        {path: '/news/details/:id', component: newsDetailsComponent},

        //图片分享
        {path: '/images/list/:id', component: imagesListComponent},
        {path: '/images/details/:id', component: imagesDetailsComponent},

        //商品功能
        {path: '/goods/list', component: goodsListComponent},
        {path: '/goods/details/:id', component: goodsDetailsComponent}

    ]
}