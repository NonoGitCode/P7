<template>
    <div class="body">
        <HeaderConnected />
        <div class="container" >
            <p class="pseudo"> {{ this.post.pseudo }} </p>
                <img :src="this.post.imageUrl"  class="ImgPost"/>
            <p class="description"> {{ this.post.description }} </p>    
            <!-- <a><font-awesome-icons icon ="faThumbsUp"/></a> -->
            <div class= "postFooter"> 
                <div class="likes">
                    <a class="numberOfLikes"> {{ this.post.likes }} </a>
                    <i class="fa-solid fa-thumbs-up icon"  id="iconLike" v-if="statusLiked == 'Liked'"  @click="likePost"/>
                    <i class="fa-regular fa-thumbs-up icon" id="iconNotLiked" v-if="statusLiked != 'Liked'" @click="likePost"/>
                </div>

                <button v-if="this.$store.state.isAdmin == true" class="btn" @click="editPost" :class="{'button--disabled' : !checkAdmin}">Modifier</button>
                <button v-if="this.$store.state.isAdmin == true" class="btn" @click="deletePost" :class="{'button--disabled' : !checkAdmin}" >Supprimer</button>
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
        this.$store.commit("grantAdmin", null)
        const id = new URL(window.location.href).href
        let currentId = id.substr(29,200)
        await this.$store.dispatch('getOnePost', currentId)
        this.post = this.$store.state.currentPost
        if(this.post.usersLiked.includes(this.$store.state.user.userId)){
            await this.$store.commit("setStatusLike", "Liked")
        };
        if(this.post.userId == this.$store.state.user.userId || this.$store.state.user.level >= 1){
            this.$store.commit("grantAdmin", true)
        }
    },
    computed: {
       
        postCoverPhoto(){
            return this.$store.state.postPhotoFileURL;
        },
        async beforeDestroy(){
            await this.$store.commit("grantAdmin", null)
            await this.$store.commit("setStatusLike", null)
        },
        ...mapState(['statusLiked'])
    },
    methods:{
        editPost(){
            let currendUserId = this.$store.state.user.userId;
            let currendPostUserID = this.$store.state.currentPost.userId;
            let currentLevelUser = this.$store.state.user.level
            if(currendUserId == currendPostUserID || currentLevelUser >= 1){
                this.$router.push(`edit/${this.$store.state.currentPost._id}`)
            }
        },
        async deletePost(){
            let currendUserId = this.$store.state.user.userId;
            let currendPostUserID = this.$store.state.currentPost.userId;
            let currentLevelUser = this.$store.state.user.level
            if(currendUserId == currendPostUserID || currentLevelUser >= 1){
                await this.$store.dispatch('deletePost', this.$store.state.currentPost._id)
                this.$router.push("/")
            }
        },
        async likePost(){
            if(this.$store.state.currentPost.usersLiked.includes(this.$store.state.user.userId)){
                let formData = {
                    like: 0,
                    id: this.post._id
                }
                await this.$store.dispatch("setLike", formData)
                await this.$store.dispatch("getOnePost",this.post._id)
                this.post.likes = this.$store.state.currentPost.likes
                this.$store.commit("setStatusLike", "")


            }else{
                let formData = {
                    like: 1,
                    id: this.post._id
                }
                await this.$store.dispatch("setLike", formData)
                await this.$store.dispatch("getOnePost",this.post._id)
                this.post.likes = this.$store.state.currentPost.likes
                this.$store.commit("setStatusLike", "Liked")

            }
        },
        checkAdmin(){
            const user = localStorage.getItem('user')
            if(user === null){
                this.$router.push('/login')
            } else {
                let userInfo = JSON.parse(user)
                let currendPostUserID = this.post.userId
                console.log(userInfo.level)
                console.log(userInfo.userId)
                console.log(currendPostUserID)
                if (userInfo.level >= 1 || userInfo.userId == currendPostUserID){
                    this.$store.commit('grantAdmin', true)
                    return true
                } else {
                    this.$store.commit('grantAdmin', false)
                    return false
                }
            }
        },
        
    },

}   
</script>

<style scoped>
.postFooter{
    display: flex;
    justify-content: space-around;
    align-items: baseline;
}
.likes{
    margin-top: 18px;
}



</style>
