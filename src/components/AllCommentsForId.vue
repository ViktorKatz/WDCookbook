<template>
    <div id="AllCommentsForId">
        <CommentCard v-for="comment in this.myComments"
                    :key="comment.title"
                    :title="comment.title"
                    :comment="comment.comment"
                    :user="comment.user"
                    :id="comment.id">
        </CommentCard>
    </div>
</template>

<style scoped>
</style>

<script>
import CommentCard from './CommentCard.vue'
    export default {
        components: { CommentCard },
        name: 'AllCommentsForId',
        props: {
            userId: Number  
        },
        data() {
            return {
                myComments: [],
                user: null
            }
        },
        methods: {
        },
        created() {
            let allRecipes = JSON.parse(localStorage.getItem("recipes"));
            let allUsers = JSON.parse(localStorage.getItem("allUsers"));
            this.user = allUsers[this.userId - 1];
            allRecipes.forEach(e => {
                e.comments.forEach(c => {
                    if (c.userId == this.userId)
                        this.myComments.push({
                            comment: c.comment,
                            title: e.title,
                            user: allUsers[this.userId - 1].username,
                            id: e.id
                        });
                });
            });
        }
    }

</script>