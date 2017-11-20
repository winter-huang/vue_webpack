<template>
    <article>
        <!--锚点占位-->
        <p id="toHere"></p>
        <p class="comments">评论留言区</p>

        <!--评论内容-->
        <div v-for="item in comments" :key="item.user_name" class="comment">
            <p>用户昵称：{{ item.user_name }} <span>{{ item.add_time | date }}</span></p>
            <p>评论内容:{{ item.content }}</p>
        </div>

        <!--翻页-->
        <div class="page">
            <span @click="getCommentPage(pageNum-1, comments)">上一页</span>
            <span v-cloak>{{ pageNum }}</span>
            <span @click="getCommentPage(pageNum+1, comments)">下一页</span>
        </div>

        <!--添加评论-->
        <textarea name="" id="" cols="30" rows="5" v-model="commentContent"></textarea>
        <button @click="postComment(commentContent)" href="#comments">提交评论</button>
    </article>
</template>

<script>
    export default{
        data(){
            return{
                comments: [],
                commentContent: ''
            }
        },
        props: ['id','pageNum','postCommentPage'],
        methods: {
            getComments(id, pageNum){
                this.axios.get('http://vue.studyit.io/api/getcomments/' + id + '?pageindex=' + pageNum)
                        .then(
                                (response) => {
                                    if (response.status == 200) {
                                        console.log(response.data.message);
                                        this.comments = response.data.message;
                                    }
                                }
                        )
            },
            getCommentPage(pageNum, comments){
                this.$emit('getPage', pageNum, comments);
            },

            postComment(commentContent){
                this.$emit('postComment', commentContent);
                this.commentContent = '';
            }

        },
        watch: {
            pageNum(){
                this.getComments(this.id, this.pageNum);
            },
            postCommentPage(newV){
                if(newV == 1){
                    this.getComments(this.id, this.pageNum);
                }
            }
        },
        created(){
            this.getComments(this.id, this.pageNum);
        }
    }
</script>

<style>
    .comments {
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
        padding: 10px 40px;
    }

    .page span {
        display: inline-block;
        width: 60px;
        text-align: center;
        margin: 10px;
    }
    #toHere{
        height: 30px;
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
</style>