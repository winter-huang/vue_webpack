<template>
    <article>
        <div class="mui-content">
            <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
                <li class="mui-table-view-cell" v-for="item in newsList" v-bind:key="item.id">
                    <router-link v-bind="{to:`/news/details/${item.id}`}">
                        <div class="mui-table">
                            <div class="mui-table-cell mui-col-xs-10">
                                <img :src="item.img_url" alt="">
                                <h4 class="mui-ellipsis" v-cloak>{{ item.title }}</h4>
                                <p class="mui-h6 mui-ellipsis" v-cloak>{{ item.zhaiyao }}</p>
                                <p v-cloak>发表时间：{{ item.add_time | date }}
                                    <span>点击：{{ item.click }}</span>
                                </p>
                            </div>
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
                newsList: [],
            }
        },

        methods: {
            getNewsList(){
                this.axios.get(this.api.getNewsList)
                        .then(
                                (response) => {
                                    if (response.status == 200) {
                                        this.newsList = response.data.message;
                                    }

                                }
                        )
            }
        },
        created(){
            this.getNewsList();
        }

    }
</script>

<style scoped>
    [v-cloak] {
        display: none;
    }

    article{
        padding-bottom: 50px;
    }

    img {
        width: 20%;
        height: 90%;
        position: absolute;
        left: 0;
        top: 0;


    }
    .mui-table-cell{
        padding-left: 21%;
    }
    p:last-child{
        color: skyblue;
    }
    p span{
        float: right;
    }
</style>