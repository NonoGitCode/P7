<template>
    <div class="create">
        <HeaderConnected />
        <h1>Modifier un post</h1>
        <div class="container">
            <p class="textDownload"> Télécharger une image</p>
            <input type="file" class="fileSubmit" ref="myFiles" @change="previewFiles" accept="image/png, image/jpeg, image/jpg">
            <p class="titleDescription"> Ecrivez votre publication juste en dessous</p>
            <textarea v-model="postDescription" id="description"/>
            <button @click="modifyPost" class="btn" :class="{'button--disabled' : !validatedFields}">Poster</button>
        </div>
    </div>
</template>

<script>
import HeaderConnected from "../components/HeaderConnected.vue"
import { mapState } from "vuex"

export default {
    name: "EditPost",
    data() {
        return {
            currentPost: null,
            postDescription:"",
        };
    },
    components: {HeaderConnected},
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
        validatedFields() {
            if (this.postDescription != "" && this.$store.state.postPhotoName !=""){
                return true;
            } else {
                return false
            };
        },
        
    },
    methods:{
        async modifyPost(){
            if(this.$store.state.user.level >= 1){
                if (this.postDescription != "" && this.$store.state.postPhotoName !=""){
                    const self = this;
                    let Post = {
                    description: this.$store.state.postDescription,
                    pseudo: this.$store.state.user.pseudo
                    };
                    let file = {
                        filename: this.$store.state.postPhotoName,
                        imageUrl: this.$store.state.postPhotoFileURL,
                    };
                    let infoCreatePost = JSON.stringify({Post,file}) 
    
                    await this.$store.dispatch('modifyPost', infoCreatePost)
                    .then((response) =>{
                            console.log(response)
                    }).catch((error)=>{
                            console.log(error);
                    })
                    await this.$store.dispatch("getAllPosts")
                    this.$router.push({ name: "post", params: {postid: postID } })
                    return;
                };
            }
        },
    },
};  

</script>
<style scoped>

</style>
