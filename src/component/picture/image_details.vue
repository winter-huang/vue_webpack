<template>
    <article>
        <h2 v-cloak>{{ imgInfo.title}}</h2>
        <p v-cloak>{{ imgInfo.add_time | date}} <span>{{ imgInfo.click }}次浏览</span></p>

        <img class="preview-img" v-for="(item, index) in imgDetail" :key="item.src" :src="item.src"
             @click="$preview.open(index, imgDetail)" height="100">

        <p v-cloak>{{ imgInfo.content }}</p>

        <!--锚点占位-->
        <p id="toHere"></p>
        <p class="comments">评论留言区</p>

        <div v-for="item in comments" :key="item.user_name" class="comment">
            <p>用户昵称：{{ item.user_name }} <span>{{ item.add_time | date }}</span></p>
            <p>评论内容：{{ item.content }}</p>
        </div>
        <!--<app-comment v-bind="{id:imgId,pageNum:currentPage}"></app-comment>-->

        <div class="page">
            <span @click="clickHandler(imgId, currentPage-1)">上一页</span>
            <span v-cloak>{{ currentPage }}</span>
            <span @click="clickHandler(imgId, currentPage+1)">下一页</span>
        </div>

        <!--添加评论-->
        <textarea name="" id="" cols="30" rows="5" v-model="commentContent"></textarea>
        <button @click="postComment" href="#comments">提交评论</button>
    </article>
</template>
<script>
    //    import CommentComponent from '../comment/comment.vue';
    export default{
//        component: {
//            'app-comment': CommentComponent
//        },
        data(){
            return {
                imgDetail: [],
                imgInfo: [],
                comments: [],
                currentPage: 1,
                imgId: '',
                commentContent: ''
            }
        },
        methods: {
            getImgDetail(id){
                this.axios.get(this.api.getImgDetail + id)
                        .then(
                                (response) => {
                                    if (response.status == 200) {
                                        //console.log(response.data.message);
                                        var temp = response.data.message;
                                        for (var i = 0; i < temp.length; i++) {
                                            temp[i].w = 400;
                                            temp[i].h = 400;
                                        }
                                        this.imgDetail = response.data.message;
                                    }
                                }
                        )

            },
            getImgInfo(id){
                this.axios.get(this.api.getImgInfo + id)
                        .then(
                                (response) => {
                                    if (response.status == 200) {
                                        //console.log(response.data.message[0]);
                                        this.imgInfo = response.data.message[0];
                                    }
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
                if (pageNum > this.currentPage) {
                    if (this.comments.length < 10) {
                        alert('当前为最后页！');
                        return;
                    }
                }
                this.currentPage = pageNum;
                this.getComments(imgId, pageNum);
                document.getElementById('toHere').scrollIntoView();
            },
            postComment(){
                if(this.commentContent == ''){
                    alert('评论内容不能为空');
                    return;
                }
                this.axios.post(this.api.postComment + this.imgId, `content=${this.commentContent}`)
                        .then(
                                (response) => {
                                    if (response.status == 200) {
                                        alert(response.data.message);
                                        this.getComments(this.imgId, 1);
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
            this.imgId = this.$route.params.id;
            this.getImgDetail(this.$route.params.id);
            this.getImgInfo(this.$route.params.id);
            this.getComments(this.$route.params.id, 1);
        }


    }
</script>

<style scoped>
    article {
        padding: 0px 8px 50px 8px;
        background-color: #fff;
    }

    img {
        width: 30%;
        margin: 5px;
    }

    h2 {
        padding: 10px 0;
        font-size: 20px;
        color: skyblue;
    }

    p span {
        margin-left: 20px;
    }

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
        padding: 10px 50px;
    }

    .page span {
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