<template>
<div class="home">
    <HeaderConnected/>
    <div class="body">
        <h1>Posts récents</h1>
       <PostComponent :correctOrder="correctOrder" v-for="(correctOrder, index) in correctOrder" :key="index" />
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
            correctOrder: [],
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
        let myArray = this.post
        this.correctOrder = myArray.sort(function(a,b){
            return b.updateTime - a.updateTime
        })
    },
    computed: {
        
        ...mapState(['status'])
    },
    async beforeDestroy(){
        await this.$store.commit("setStatusLike", null)
    },
    components: { HeaderConnected, PostComponent },
}
</script>

<style scoped>

</style>