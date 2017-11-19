<template>
    <article>
        <h3 v-cloak>{{ newsDetail.title }}</h3>
        <p v-cloak class="pBorder">{{ newsDetail.add_time | date }}
            <span>{{ newsDetail.click }}次浏览</span>
        </p>
        <p v-html="newsDetail.content" class="content"></p>

        <!--锚点占位-->
        <p id="toHere"></p>
        <p class="comments">评论留言区</p>

        <div v-for="item in comments" :key="item.user_name" class="comment">
            <p>用户昵称：{{ item.user_name }} <span>{{ item.add_time | date }}</span></p>
            <p>评论内容：{{ item.content }}</p>
        </div>

        <div class="page">
            <span @click="clickHandler(newsId, currentPage-1)">上一页</span>
            <span v-cloak>{{ currentPage }}</span>
            <span @click="clickHandler(newsId, currentPage+1)">下一页</span>
        </div>

        <!--添加评论-->
        <textarea name="" id="" cols="30" rows="5" v-model="commentContent"></textarea>
        <button @click="postComment">提交评论</button>
    </article>
</template>

<script>
    export default{
        data(){
            return{
                newsId: '',
                newsDetail: '',
                comments: [],
                currentPage: 1,
                commentContent: ''
            }
        },
        methods: {
            getDetail(id){
                this.axios.get(this.api.getnewsDetails + id)
                        .then(
                                (response) => {
                                    //console.log(response.data.message);
                                    this.newsDetail = response.data.message[0];
                                }
                        )
            },
            getComments(id, pageNum){
                    this.axios.get('http://vue.studyit.io/api/getcomments/' + id + '?pageindex=' + pageNum)
                            .then(
                                (response) => {
                                    if (response.status == 200) {
                                        this.comments = response.data.message;
                                }
                            }
                )
            },
            clickHandler(imgId, pageNum){
                if (pageNum <= 0) {
                    alert('当前为第一页');
                    return;
                }
                if(pageNum > this.currentPage){
                    if(this.comments.length < 10){
                        alert('当前为最后页！');
                        return;
                    }
                }
                this.currentPage = pageNum;
                this.getComments(imgId, pageNum);
                document.getElementById('toHere').scrollIntoView();
            },
            postComment(){
                this.axios.post(this.api.postComment + this.newsId, `content=${this.commentContent}`)
                        .then(
                                (response) => {
                                    if(response.status == 200){
                                        alert(response.data.message);
                                        this.getComments(this.newsId, 1);
                                        this.commentContent = '';
                                        this.currentPage = 1;
                                        document.getElementById('toHere').scrollIntoView();
                                    }
                                }
                        )
            }
        },
        created(){
            //console.log(this.$route.params.id);
            this.newsId = this.$route.params.id;
            this.getDetail(this.$route.params.id);
            this.getComments(this.$route.params.id, 1);
        }
    }
</script>

<style scoped>
    article{
        padding: 4px 8px 50px 8px;
        background-color: #fff;
    }
    h3{
        line-height: 32px;
    }
    [v-cloak] {
        display: none;
    }
    article p{
        padding: 0;
    }
    .pBorder{
        border-bottom: 1px solid #aaa;
    }
    p span{
        margin-left: 10px;
    }
    .content img{
        width: 100% !important;
    }

    .comments{
        border-top: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
        font-size: 18px;
        padding: 8px 4px;
        text-align: center;
    }

    .comment {
        padding-top: 4px;
        border-bottom: 1px solid #aaa;
    }
    .comment span {
        float: right;
    }

    .page {
        padding: 10px 50px;
    }
    .page span{
        display: inline-block;
        width: 60px;
        text-align: center;
        margin: 10px;
    }

    textarea{
        margin-bottom: 0px;
    }
    button{
        width: 100%;
        text-align: center;
        border-color: skyblue;
        font-size: 18px;
        color: blue;
    }

    #toHere{
        height: 30px;
    }

</style>