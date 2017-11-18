<template>
    <article>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in carouselImgs" v-bind:key="item.url">
                <a :href="item.url">
                    <img :src="item.img" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe>

        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-home"></span>
                    <div class="mui-media-body">首页</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-image"><span class="mui-badge">5</span></span>
                    <div class="mui-media-body">图片分享</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-chat"></span>
                    <div class="mui-media-body">新闻资讯</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">Search</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-gear"></span>
                    <div class="mui-media-body">Setting</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-info"></span>
                    <div class="mui-media-body">about</div></a></li>
            </ul>
        </div>
    </article>
</template>

<script>
    export default{
        data(){
            return {
                carouselImgs: []
            }
        },
        methods: {
            getCarousel(){
                this.axios.get('http://vue.studyit.io/api/getlunbo')
                        .then(
                                (response) => {
                                    console.log(response.data.message);
                                    this.carouselImgs = response.data.message;
                                }
                        )
            }
        },
        created(){
            this.getCarousel();
        }

    }
</script>

<style lang="less" scoped>
    article {
        height: 220px;
        img{
            width: 100%;
            height: 220px;
        }
    }

</style>