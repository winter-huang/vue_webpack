<template>
    <div v-for="item in comments" :key="item.user_name">
        <p>用户昵称：{{ item.user_name }} <span>{{ item.add_time | date }}</span></p>
        <p>评论内容:{{ item.content }}</p>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                comment: []
            }
        },
        props: ['id','pageNum'],
        methods: {
            getComments(id, pageNum){
                this.axios.get('http://vue.studyit.io/api/getcomments/' + id + '?pageindex=' + pageNum)
                        .then(
                                (response) => {
                                    if (response.status == 200) {
                                        console.log(response.data.message[0]);
                                        this.comments = response.data.message;
                                    }
                                }
                        )
            }
        },
        created(){
            this.getComments(this.id, this.pageNum);
        }
    }
</script>