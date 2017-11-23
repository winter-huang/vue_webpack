<template>
    <footer>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item mui-active" to="/">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/goods/list">
                <span class="mui-icon mui-icon-extra mui-icon-extra-gift"></span>
                <span class="mui-tab-label">商品</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" v-cloak>{{ $store.getters.getBuyTotal }}</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="#tabbar-with-map">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </router-link>
        </nav>
    </footer>
</template>

<script>
//    export default{
//        data(){
//            return {
//                goodsSum: 0,
//                goodsData: JSON.parse(localStorage.getItem('goodsCart')) || {}
//            }
//        },
//        methods: {
//            getGoodsTotalNum(){
//                var sum = 0;
//                for (var key in this.goodsData) {
//                    sum += this.goodsData[key][0];
//                }
//                this.goodsSum = sum;
//            }
//        },
//        created(){
//            this.getGoodsTotalNum();
//        }
//    }
</script>