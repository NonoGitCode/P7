<template>
    <div class="body">
        <HeaderConnected />
        <div class="container" >
        <!-- <div class="container" v-if="currentBlog"> -->
            <p class="pseudo"> {{ pseudo }} </p>
            <!-- <p class="pseudo"> {{ this.currentPost[0].postPseudo }} </p> -->
                <img src="../assets/test.jpg"  class="ImgPost"/>
                <!-- <img :src= this.currentPost[0].postCoverPhoto  class="ImgPost"/> -->
            <p class="description"> {{ description }} </p>
            <!-- <p class="description"> {{ this.currentPost[0].description }}</p>  -->
            
            <!-- <a><font-awesome-icons icon ="faThumbsUp"/></a> -->
            <div class= "postFooter"> 
                <a class="numberOfLikes"> {{ numberOfLikes }} </a>
                <!-- <a class="numberOfLikes"> {{ this.currentPost[0].numberOfLikes }} </a> -->
                <button class="btn" @click="editPost" :class="{'button--disabled' : !checkAdmin}">Modifier</button>
                <button class="btn" @click="deletePost" :class="{'button--disabled' : !checkAdmin}" >Supprimer</button>
            </div> 
        </div>
    </div>
</template>

<script>

import HeaderConnected from "../components/HeaderConnected.vue"
import { mapState } from 'vuex';

export default {
    name: "SinglePost",
    props:["post"],
    data() {
        return {
            description: "",
            imageUrl: "",
            pseudo: "",
            numberOfLikes: 0,
            currentPost: null,
        };
    },
    components: {HeaderConnected},
    mounted(){
        if(this.$store.state.user.userId == -1){
            this.$router.push('/login')
            return;
        }
    },
    // async mounted(){
    //     this.currentPost = await this.$store.state.allPosts.filter(post => {
    //         return post.postID === this.$route.params.postid
    //     })
    // },
    computed: {
        checkAdmin(){
            const user = localStorage.getItem('user')
            if(user === null){
                this.$router.push('/login')
            } else {
                let userInfo = JSON.parse(user)
                if (userInfo.level >= 1){
                    this.$store.commit('grantAdmin', true)
                    return true
                } else {
                    this.$store.commit('grantAdmin', false)
                    return false
                }
            }
        },
        postCoverPhoto(){
            return this.$store.state.postPhotoFileURL;
        },
        beforeDestroy(){
            this.$store.commit("grantAdmin", null)
        },
        // async getOnePost(){
        //     const self = this;
        //     await this.$store.dispatch('getOnePost',postID)
        //     .then((response) => {
        //         self.$router.push("{name: 'post', params: { postid: this.post.postID } }")
        //         console.log(reponse)
        //     }).catch((error) => {
        //         console.log(error)
        //     })
        //     return;
        //     //Revoir les params
        // },
        ...mapState(['status'])
    },
    methods:{
        editPost(){
            if(this.$store.state.isAdmin == true){
                this.$router.push('/edit')
            }
        },
        async deletePost(){
            if(this.$store.state.isAdmin == true){
                const self = this;
                await this.$store.dispatch('deleteOnePost')
               .then((response)=> {
                    self.$router.push('/')
                    console.log(response)
               }).catch((error) => {
                    console.log(error)
               })
            };
        },
        

    }
}   

</script>
<style scoped>
.postFooter{
    display: flex;
    justify-content: space-around;
    align-items: baseline;
}
.numberOfLikes{
    margin-top: 15px;
}

</style>
