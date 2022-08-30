<template>
<div class="home">
    <HeaderConnected/>
    <div class="body">
        <h1>Posts récents</h1>
       <PostComponent :post="post" v-for="(post, index) in post" :key="index" />
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import HeaderConnected from "../components/HeaderConnected.vue"
import PostComponent from "../components/PostComponent.vue"


export default {
    name:"Home",
    data(){
        return{
            post: [],
        }
    },
    mounted(){
        if(this.$store.state.user.userId == -1){
            this.$router.push('/login')
            return;
        }
    },
    async mounted(){
        await this.$store.dispatch('getAllPosts')
        this.post = this.$store.state.allPosts
        console.log(this.post)
    },
    computed: {
        
        ...mapState(['status'])
    },
    components: { HeaderConnected, PostComponent },
}
</script>

<style scoped>

</style>