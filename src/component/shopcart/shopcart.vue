<template>
    <article class="shopcart-list">

        <!-- 商品列表 -->
        <div class="goods" v-for="item in buyGoodsList" :key="item.id">
            <mt-switch class="switch" v-model="item.isSelected"></mt-switch>
            <img class="img" :src="item.thumb_path">
            <div class="inforight">
                <h4 class="mui-ellipsis-2" v-cloak>{{ item.title }}</h4>
                <div class="bottom">
                    <ul>
                        <li v-cloak>￥{{ item.sell_price }}</li>
                        <li>
                            <app-buyNum  :id="item.id" :stock="buyGoodsData[item.id][1]"
                                        @change="getBuyNum"></app-buyNum>
                        </li>
                        <li>
                            <a href="javascript:void(0)" @click="delGoods(item.id)">删除</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 总价 -->
        <div class="total">
            <div class="total_val">
                <ul>
                    <li>总计（不含运费）</li>
                    <li v-cloak>已勾选商品 {{ getGoodsTotal }} 件</li>
                    <li v-cloak>总价： ￥{{ getPriceTotal }} 元</li>
                </ul>
            </div>
            <div class="total_btn">
                <mt-button type="primary">付 款</mt-button>
            </div>
        </div>

    </article>
</template>

<script>
    export default {
        data(){
            return {
                buyGoodsList: [],
                buyGoodsData: {}
            }
        },
        methods: {
            getBuyList(){
                this.buyGoodsData = JSON.parse(localStorage.getItem('goodsCart')) || {};
                var ids = Object.keys(this.buyGoodsData).join(',');
                if (ids) {
                    this.axios.get(this.api.getBuyList + ids)
                            .then(
                                    (response) => {
                                        if (response.status == 200) {
                                            var temp = response.data.message;
                                            for (var i = 0; i < temp.length; i++) {
                                                temp[i].isSelected = true;
                                            }
                                            this.buyGoodsList = temp;
                                        }
                                    }
                            )
                }
            },
            getBuyNum(id, num, stock) {
//                this.buyGoodsData[id] = [num, this.buyGoodsData[id][1]];
                this.$store.commit('updateTotalNum',{
                    id: id,
                    total: num,
                    stock: stock
                });
            },
            delGoods(id){
                if(confirm('是否删除')){
                    this.$store.commit('delGoods', id);
                    this.buyGoodsList = this.buyGoodsList.filter(v => v.id != id);
                }
            }
        },
        created(){
            this.getBuyList();
        },
        computed: {
            getGoodsTotal(){
                var sum = 0;
                for (var i = 0; i < this.buyGoodsList.length; i++) {
                    if (this.buyGoodsList[i].isSelected) {
                        sum += this.$store.state.totalNum[this.buyGoodsList[i].id][0];
                    }

                }
                return sum;
            },
            getPriceTotal(){
                var sum = 0;
                for (var i = 0; i < this.buyGoodsList.length; i++) {
                    if (this.buyGoodsList[i].isSelected) {
                        var temp = this.$store.state.totalNum[this.buyGoodsList[i].id][0] * this.buyGoodsList[i].sell_price;
                        sum += temp;
                    }
                }
                return sum;
            }

        }

    }
</script>

<style lang="less">
    .shopcart-list {

    .goods {
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        height: 102px;
        display: flex;
        padding: 5px;

    .switch {
        flex: 0 0 52px;
    }

    .img {
        margin-left: 5px;
        height: 75px;
        width: 75px;
        flex: 0 0 85px;
    }

    .inforight {
        margin-left: 5px;
        flex: 1;
    }

    .inforight ul {
        padding-left: 0px;
    }

    .inforight li {
        list-style: none;
        display: inline-block;
    }

    .inforight h4 {
        color: #0094ff;
        font-size: 14px;
    }

    .bottom li:first-child {
        color: red;
        margin-right: 5px;
    }

    .bottom li:last-child {
        margin-left: 5px;
    }

    }
    .total {
        height: 84px;
        background-color: rgba(0, 0, 0, 0.1);
        display: flex;
        padding: 5px 14px;

    ul {
        padding-left: 0px;
        margin: 14px 0;

    li {
        list-style: none;
        font-size: 14px;
    }

    }
    &
    _val {
        flex: 1;
    }

    &
    _btn {
        flex: 0 0 60px;
        margin: 18px 0 0 0;
    }

    }
    }

    article {
        padding-bottom: 50px;
    }

    .total_btn {
        margin-left: 120px;
        margin-top: 20px;
    }
</style>