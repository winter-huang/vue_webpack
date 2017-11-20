<template>
    <article>
        <h2 v-cloak>{{ imgInfo.title}}</h2>
        <p v-cloak>{{ imgInfo.add_time | date}} <span>{{ imgInfo.click }}次浏览</span></p>

        <img class="preview-img" v-for="(item, index) in imgDetail" :key="item.src" :src="item.src"
             @click="$preview.open(index, imgDetail)" height="100">

        <p v-cloak>{{ imgInfo.content }}</p>

        <app-comment v-bind="{id:imgId,pageNum:currentPage,postCommentPage:postCommentPage}" @getPage="getCommentsPage" @postComment="postComment"></app-comment>
    </article>
</template>
<script>
    export default{
        data(){
            return {
                imgId: '',
                imgDetail: [],
                imgInfo: [],
                currentPage: 1,
                postCommentPage: ''
            }
        },
        methods: {
            getImgDetail(id){
                this.axios.get(this.api.getImgDetail + id)
                        .then(
                                (response) => {
                                    if (response.status == 200) {
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
                                        this.imgInfo = response.data.message[0];
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
                this.axios.post(this.api.postComment + this.imgId, `content=${commentContent}`)
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
            this.imgId = this.$route.params.id;
            this.getImgDetail(this.$route.params.id);
            this.getImgInfo(this.$route.params.id);
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
</style>