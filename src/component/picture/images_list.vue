<template>
    <article>
        <!--<div class="nav">-->
            <!--<ul>-->
                <!--<li @click="clickHandler(0)">-->
                    <!--<router-link v-bind="{to:'/images/list/0'}">全部</router-link>-->
                <!--</li>-->
                <!--<li v-for="item in imgCategory" :key="item.id" @click="clickHandler(item.id)">-->
                    <!--<router-link v-bind="{to:`/images/list/${item.id}`}">{{ item.title }}</router-link>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->

        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a class="mui-control-item" :class="[isActive==0?'mui-active':'']" @click="clickHandler(0)" v-bind="{to:'/images/list/0'}">
                    全部
                </a>
                <a class="mui-control-item" :class="[isActive==item.id?'mui-active':'']" v-for="item in imgCategory" :key="item.id" @click="clickHandler(item.id)" v-bind="{to:`/images/list/${item.id}`}">
                    {{ item.title }}
                </a>
            </div>
        </div>

        <div class="list">
            <ul>
                <li v-for="item in imgsList" :key="item.img_url">
                    <router-link v-bind="{to: `/images/details/${item.id}`}">
                        <img v-lazy="item.img_url">
                        <div>
                            <h5 v-cloak>{{ item.title }}</h5>
                            <p v-cloak>{{ item.zhaiyao }}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </article>
</template>

<script>
    export default{
        data(){
            return {
                imgCategory: [],
                selected: '',
                imgsList: [],
                isActive: ''
            }
        },
        methods: {
            getImgList(id){
                this.axios.get(this.api.getImgList + id)
                        .then(
                                (response) => {
                                    if(response.status == 200){
                                        this.imgsList = response.data.message;
                                        //console.log(response.data.message.length == 0);
                                        //如果没返回数据为空的时候给定一个id
                                        if (response.data.message.length == 0) {
                                            this.getImgList(24);
                                        }
                                    }
                                }
                        )
            },
            getImgcategory(){
                this.axios.get(this.api.getImgcategory)
                        .then(
                                (response) => {
                                    if(response.status == 200){
                                        this.imgCategory = response.data.message;
                                    }
                                }
                        )
            },
            clickHandler(id){
                if(this.isActive == id){
                    return;
                }
                this.isActive = id;
                this.getImgList(id);
            }
        },
        created(){
            this.getImgList(this.$route.params.id);
            this.getImgcategory();
        }

    }
</script>

<style>
    .mui-segmented-control.mui-scroll-wrapper .mui-scroll{
        height: auto;
        width: 100%;
        overflow-x: auto;
    }
    .mui-segmented-control.mui-scroll-wrapper .mui-scroll::-webkit-scrollbar {
        /*opacity: 0;*/
        display: none;
    }
    article {
        padding: 0 8px;
        background-color: #fff;
    }

    .nav {
        overflow: hidden;
    }

    .nav li {
        float: left;
        margin: 5px;
    }

    .list {
        padding-bottom: 50px;
    }

    .list img {
        width: 100%;
    }

    .list li {
        position: relative;
        margin-bottom: 10px;
    }

    .list div {
        background-color: rgba(0, 0, 0, .5);
        position: absolute;
        bottom: 0px;
        left: 0;
        padding: 0 4px;
    }

    .list h5 {
        color: #fff;
        font-size: 16px;
        padding-bottom: 5px;
    }

    .list p {
        color: #fff;
        word-break: break-all;
        overflow: hidden;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }
    .no-active{
        color: inherit;
    }
</style>