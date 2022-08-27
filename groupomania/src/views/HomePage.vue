<template>
<div>
    <HeaderConnected/>
    <div class="body">
        <h1>Postes récents</h1>
        <div :key="index" v-for="(myObj, index) in myObj">

        </div>
       <PostComponent />
    </div>
</div>
</template>

<script>
import HeaderConnected from "../components/HeaderConnected.vue"
import PostComponent from "../components/PostComponent.vue"
import { mapState } from "vuex"

export default {
    name:"Home",
    data(){
        return{
            myObj:{

                description: "",
                likes: "",
                imageUrl: "",
            }
        }
    },
    mounted(){
        if(this.$store.state.user.userId == -1){
            this.$router.push('/login')
            return;
        }
    },
    computed:{
        ...mapState({
            user: 'userInfos',
        }),
    },
    components: { HeaderConnected, PostComponent },
}
</script>

<style scoped>

.body{
   background-color: rgb(231, 231, 231)
}
h1{
    margin-bottom: -5px;
}
</style>