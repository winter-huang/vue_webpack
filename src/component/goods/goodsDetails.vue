<template>
    <article class="goods-detail">
        <!-- 商品购买 -->
        <div class="mui-card">
            <!-- 名称 -->
            <div class="mui-card-header">{{ goodsInfo.title }}</div>
            <!--轮播图-->
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in carouselImgs" v-bind:key="item.src">
                    <img class="preview-img" v-for="(item, index) in carouselImgs" :key="item.src"
                         :src="item.src" @click="$preview.open(index, carouselImgs)" height="100">
                </mt-swipe-item>
            </mt-swipe>
            <!-- 价格 -->
            <div class="mui-card-content mui-card-content-inner">
                <div class="price"><s v-cloak>市场价:￥{{ goodsInfo.market_price }}</s> <span>销售价: </span> <em v-cloak>￥{{
                    goodsInfo.sell_price }}</em></div>
                <div><span>购买数量：</span>
                    <!--数字输入框 -->
                    <app-buyNum :buyN="buyNum" :id="goodsId" @change="getBuyNum"></app-buyNum>
                    <span>剩余数量：{{ goodsInfo.stock_quantity }} 件</span>
                </div>
            </div>
            <!-- 按钮 -->
            <div class="mui-card-footer">
                <button type="button" class="mui-btn mui-btn-success mui-btn-block
mui-btn-outlined" @click="jiesuan">结算</button>
                <div></div>
                <button type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined"
                @click="joinCart">加入购物车</button>
            </div>
        </div>

        <!-- 评论与介绍 -->
        <div class="mui-card">
            <!-- 选项卡 -->
            <mt-navbar v-model="selected">
                <mt-tab-item id="comment">商品评论</mt-tab-item>
                <mt-tab-item id="introduce">图文介绍</mt-tab-item>
            </mt-navbar>
            <!-- 内容 -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="comment">
                    <mt-cell>
                        <app-comment v-bind="{id:goodsId, pageNum:commentPage, postCommentPage:postCommentPage}" @getPage="getCommentsPage" @postComment="postComment"></app-comment>
                    </mt-cell>
                </mt-tab-container-item>

                <mt-tab-container-item id="introduce">
                    <mt-cell>
                        <div>
                            <h3 v-cloak>{{ goodsDetails.title }}</h3>
                            <p v-html="goodsDetails.content"></p>
                        </div>
                    </mt-cell>
                </mt-tab-container-item>

            </mt-tab-container>
        </div>

    </article>
</template>

<script>
    export default {
        data(){
            return {
                goodsId: this.$route.params.id,
                goodsDetails: {},
                goodsInfo: {},
                buyNum: 0,
                selected: 'introduce',
                carouselImgs: '',//轮播图图片
                commentPage: 1,//当前评论的页码
                postCommentPage: '',//提交评论的页码
                //goodsStock: '',//商品的剩余数量
            }
        },
        methods: {
            //获取商品描述介绍
            getGoodsDetails(id){
                this.axios.get(this.api.getGoodsDetails + id)
                        .then(
                                (response) => {
                                    if (response.status == 200) {
                                        this.goodsDetails = response.data.message[0];
                                        //console.log(response.data.message);
                                    }
                                }
                        )
            },
            //获取商品信息
            getGoodsInfo(id){
                this.axios.get(this.api.getGoodsInfo + id)
                        .then(
                                (response) => {
                                    if (response.status == 200) {
                                        this.goodsInfo = response.data.message[0];
                                        //this.goodsStock = this.goodsInfo.stock_quantity;
                                        //console.log(response.data.message[0]);
                                    }
                                }
                        )
            },
            //获取到子组件返回的购买数量
            getBuyNum(num) {
                this.buyNum = num;
            },
            //获取商品的轮播图片
            getGoodsImages(id){
                this.axios.get(this.api.getGoodsImages + id)
                        .then(
                                (response) => {
                                    if (response.status == 200) {
                                        var temp = response.data.message;
                                        for (var i = 0; i < temp.length; i++) {
                                            temp[i].w = 400;
                                            temp[i].h = 400;
                                        }
                                        this.carouselImgs = temp;
                                    }
                                }
                        )
            },
            //获取商品的评论
            getCommentsPage(pageNum, comments){
                if (pageNum <= 0) {
                    alert('当前为第一页');
                    return;
                }
                if (pageNum > this.commentPage) {
                    if (comments.length < 10) {
                        alert('当前为最后页！');
                        return;
                    }
                }
                this.commentPage = pageNum;
                document.getElementById('toHere').scrollIntoView();
            },
            //添加商品的评论
            postComment(commentContent){
                if(commentContent == ''){
                    alert('评论内容不能为空');
                    return;
                }
                this.axios.post(this.api.postComment + this.goodsId, `content=${commentContent}`)
                        .then(
                                (response) => {
                                    if (response.status == 200) {
                                        alert(response.data.message);
                                        if(this.commentPage == 1){
                                            this.postCommentPage = 1;
                                        }else {
                                            this.commentPage = 1;
                                            this.postCommentPage = '';
                                        }
                                        document.getElementById('toHere').scrollIntoView();
                                    }
                                }
                        )
            },
            //加入购物车
            joinCart(){
                if(this.buyNum > this.goodsInfo.stock_quantity){
                    alert(`该商品库存不足,最多可购买${this.goodsInfo.stock_quantity}件`);
                    this.buyNum = this.goodsInfo.stock_quantity;
                    return;
                }
                let oldGoodsCart = JSON.parse(localStorage.getItem('goodsCart')) || {};
                oldGoodsCart[this.goodsId] = [this.buyNum,this.goodsInfo.stock_quantity];
                localStorage.setItem('goodsCart', JSON.stringify(oldGoodsCart));
                alert('成功加入购物车');
                location.reload();
            },
            //将购物车里某个商品的购买数量渲染到页面
            oldBuyNum(){
                let oldGoodsCart = JSON.parse(localStorage.getItem('goodsCart')) || {};
                this.buyNum = oldGoodsCart[this.goodsId] ? oldGoodsCart[this.goodsId][0] : 0;
            },
            //结算
            jiesuan(){
                location.href = '/#/shopcart';
            }
        },
        created(){
            this.getGoodsDetails(this.goodsId);
            this.getGoodsInfo(this.goodsId);
            this.getGoodsImages(this.goodsId);
            this.oldBuyNum();
        }

    }
</script>

<style lang="less">
    .mint-swipe{
        height: 280px;
        padding: 10px;
        overflow: hidden;
        img{
            width: 100%;
            height: 280px;
        }
    }
    .mint-navbar{
        margin-bottom: 10px;
    }

    .mint-cell img {
        width: 100%;
        height: auto;
    }

    .goods-detail {
        background-color: #fff;
        padding-bottom: 50px;
    .mui-card-content {

    .price {
        color: rgb(51, 51, 51);
        margin-bottom: 4px;

    span {
        margin-left: 6px;
    }

    em {
        font-size: 18px;
        color: red;
    }

    }
    }
    .mui-card-footer {

    div {
        width: 100%;
    }

    .mui-btn {
        padding: 8px 0;
        font-size: 16px;
    }

    }
    .mint-tab-item {

    &
    .is-selected {
        margin-bottom: 0;
        border-bottom: 3px solid #2ce094;
        color: #2ce094;
    }

    }
    .mint-tab-item-label {
        font-size: 18px;
        color: #2ce094;
    }

    }
</style>