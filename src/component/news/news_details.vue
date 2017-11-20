<template>
    <article>
        <h3 v-cloak>{{ newsDetail.title }}</h3>
        <p v-cloak class="pBorder">{{ newsDetail.add_time | date }}
            <span>{{ newsDetail.click }}次浏览</span>
        </p>
        <p v-html="newsDetail.content" class="content"></p>

        <!--公共组件-->
        <app-comment v-bind="{id:newsId,pageNum:currentPage,postCommentPage:postCommentPage}" @getPage="getCommentsPage" @postComment="postComment"></app-comment>
    </article>
</template>

<script>
    export default{
        data(){
            return{
                newsId: '',//新闻id
                newsDetail: '',//新闻详情
                currentPage: 1,//当前页码
                postCommentPage: ''//提交评论的页码
            }
        },
        methods: {
            getDetail(id){
                this.axios.get(this.api.getnewsDetails + id)
                        .then(
                                (response) => {
                                    if(response.status == 200){
                                        this.newsDetail = response.data.message[0];
                                    }
                                }
                        )
            },
            getCommentsPage(pageNum, comments){
                if (pageNum <= 0) {
                    alert('当前为第一页');
                    return;
                }
                if (pageNum > this.currentPage) {
                    if (comments.length < 10) {
                        alert('当前为最后页！');
                        return;
                    }
                }
                this.currentPage = pageNum;
                document.getElementById('toHere').scrollIntoView();
            },
            postComment(commentContent){
                if(commentContent == ''){
                    alert('评论内容不能为空');
                    return;
                }
                this.axios.post(this.api.postComment + this.newsId, `content=${commentContent}`)
                        .then(
                                (response) => {
                                    if (response.status == 200) {
                                        alert(response.data.message);
                                        if(this.currentPage == 1){
                                            this.postCommentPage = 1;
                                        }else {
                                            this.currentPage = 1;
                                            this.postCommentPage = '';
                                        }
                                        document.getElementById('toHere').scrollIntoView();
                                    }
                                }
                        )
            }
        },
        created(){
            this.newsId = this.$route.params.id;
            this.getDetail(this.$route.params.id);
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

</style>