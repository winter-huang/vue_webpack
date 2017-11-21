<template>
    <article class="goods-list">
        <ul class="mui-table-view mui-grid-view">
            <!-- 商品详情 -->
            <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in goodsList" :key="item.id">
                <router-link v-bind="{to:`/goods/details/${item.id}`}">
                    <div class="mui-card">
                        <!-- 商品图片 -->
                        <div class="mui-card-header">
                            <img :src="item.img_url" alt=""/>
                        </div>
                        <!-- 商品描述 -->
                        <div class="mui-card-footer ">
                            <p class="mui-ellipsis-2" v-cloak>{{ item.zhaiyao }}</p>
                        </div>
                        <!-- 商品价格 -->
                        <div class="mui-card-content">
                            <p class="price">
                                <span v-cloak>￥{{ item.sell_price }}</span>
                                <s v-cloak>￥{{ item.market_price }}</s>
                            </p>
                            <p class="tip">
                                <span>热卖中</span>
                                <span v-cloak>{{ item.stock_quantity }}</span>
                            </p>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
        <!-- 加载更多 -->
        <button class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined" @click="getMore" :disabled="isStop">
            {{ isStop?'无更多数据':'加载更多' }}
        </button>
    </article>
</template>

<script>
    export default {
        data(){
            return {
                pageIndex: 1,
                goodsList: [],
                isStop: false
            }
        },
        methods: {
            getGoodsList(){
                this.axios.get(this.api.getGoodsList + `pageindex=${this.pageIndex}`)
                        .then(
                                (response) => {
                                    console.log(response.data.message);
                                    if (response.status == 200) {
                                        // ...是分解数组，然后再push
                                        this.goodsList.push(...response.data.message);
                                        if(response.data.message.length < 10){
                                            this.isStop = true;
                                        }
                                    }

                                }
                        )
            },
            getMore(){
                if(this.isStop){
                    return;
                }
                this.pageIndex += 1;
                this.getGoodsList();
            }

        },
        created(){
            this.getGoodsList();
        }

    }
</script>

<style lang="less">
    article {
        padding-bottom: 50px;
    }
    *{
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .goods-list {

    .mui-card {
        box-shadow: 0px 0px 4px rgba(0, 0, 0, .3);
    }

    .mui-card-header {
        padding: 8px;

    /*height: 100px;*/
    img {
        width: 100%;
        height: 100%;
    }

    }
    .mui-card-content {
        text-align: center;

    .price {
        margin-bottom: 4px;
        color: #000;

    span {
        color: red;
    }

    }
    .tip {
        overflow: hidden;
        padding: 0 8px;
        font-size: 12px;

    span:first-child {
        float: left;
    }

    span:last-child {
        float: right;
    }

    }
    }
    }
</style>