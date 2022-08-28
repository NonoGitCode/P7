<template>
<div class="home">
    <HeaderConnected/>
    <div class="body">
        <h1>Postes récents</h1>
       <PostComponent :post="post" v-for="(post, index) in myObj" :key="index" />
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
            myObj: [
                {
                    description: "description2",
                    imageUrl: "#",
                    pseudo: "jean",
                    numberOfLikes: 0
                },
                {
                    description: "description3",
                    imageUrl: "#",
                    pseudo: "jean",
                    numberOfLikes: 5
                },
                {
                    description: "description4",
                    imageUrl: "#",
                    pseudo: "jean",
                    numberOfLikes: 10
                }
            ]
        }
    },
    mounted(){
        if(this.$store.state.user.userId == -1){
            this.$router.push('/login')
            return;
        }
    },
    computed:{
        ...mapState(['status'])
    },
    components: { HeaderConnected, PostComponent },
}
</script>

<style scoped>

</style>