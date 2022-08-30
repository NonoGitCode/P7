<template>
    <div class="body">
        <HeaderConnected />
        <div class="container" >
        <!-- <div class="container" v-if="currentBlog"> -->
            <p class="pseudo"> {{ this.post.pseudo }} </p>
            <!-- <p class="pseudo"> {{ this.currentPost[0].postPseudo }} </p> -->
                <img :src="this.post.imageUrl"  class="ImgPost"/>
                <!-- <img :src= this.currentPost[0].postCoverPhoto  class="ImgPost"/> -->
            <p class="description"> {{ this.post.description }} </p>
            <!-- <p class="description"> {{ this.currentPost[0].description }}</p>  -->
            
            <!-- <a><font-awesome-icons icon ="faThumbsUp"/></a> -->
            <div class= "postFooter"> 
                <a class="numberOfLikes"> {{ this.post.numberOfLikes }} </a>
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
    data() {
        return {
            post: [],
            currentPost: null,
            currentId:null,
        };
    },
    components: {HeaderConnected},
    mounted(){
        if(this.$store.state.user.userId == -1){
            this.$router.push('/login')
            return;
        }
    },
    async mounted(){
        const id = new URL(window.location.href).href
        let currentId = id.substr(29,200)
        await this.$store.dispatch('getOnePost', currentId)
        this.post = this.$store.state.currentPost
        console.log(this.post)
        console.log(this.$store.state.user.userId)
    },
    computed: {
       async checkAdmin(){
            const user = localStorage.getItem('user')
            if(user === null){
                this.$router.push('/login')
            } else {
                let userInfo = JSON.parse(user)
                let currendPostUserID = this.post.userId
                if (userInfo.level >= 1 || userInfo.userId == currendPostUserID){
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
            let currendUserId = this.$store.state.user.userId;
            let currendPostUserID = this.$store.state.currentPost.userId;
            let currentLevelUser = this.$store.state.user.level
            if(currendUserId == currendPostUserID || currentLevelUser >= 1){
                console.log(this.$store.state.currentId)
                this.$router.push(`edit/${this.$store.state.currentPost._id}`)
            }
        },
        // async deletePost(){
        //     if(this.$store.state.isAdmin == true){
        //         const self = this;
        //         await this.$store.dispatch('deleteOnePost')
        //        .then((response)=> {
        //             self.$router.push('/')
        //             console.log(response)
        //        }).catch((error) => {
        //             console.log(error)
        //        })
        //     };
        // },
        

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
