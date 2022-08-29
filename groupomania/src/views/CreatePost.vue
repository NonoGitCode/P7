<template>
    <div class="create">
        <HeaderConnected />
        <h1>Créer un nouveau post</h1>
        <div class="container">
            <p class="textDownload"> Télécharger une image</p>
            <input type="file" class="fileSubmit" ref="postPhoto" @change="fileChange" accept=".png, .jpeg, .jpg">
            <p class="titleDescription"> Ecrivez votre publication juste en dessous</p>
            <textarea v-model="postDescription" id="description"/>
            <button @click="poster" class="btn" :class="{'button--disabled' : !validatedFields}">Poster</button>
        </div>
    </div>
</template>

<script>

import HeaderConnected from "../components/HeaderConnected.vue"
import { mapState } from 'vuex';

export default {
    name: "CreatePost",
    data() {
        return {
            file: null,
        };
    },
    components: {HeaderConnected},
    mounted(){
        if(this.$store.state.userId == -1){
            this.$router.push('/login')
            return;
        };
    },
    computed:{
        validatedFields() {
            if (this.postDescription != "" && this.$store.state.postPhotoName !=""){
                return true;
            } else {
                return false
            };
        },
        profileId(){
            return this.$store.state.user.userId;
        },
        postPhotoName(){
            return this.$store.state.postPhotoName;
        },
        postPseudo(){
            return this.$store.state.postPseudo;
        },
        postDescription: {
            get() {
                return this.$store.state.postDescription
            },
            set(payload) {
                this.$store.commit("updatePostDescription", payload);
            },
        },
        ...mapState(['status']),
    },
    methods:{
        fileChange(){
            this.file = this.$refs.postPhoto.files[0];
            const fileName = this.file.name
            this.$store.commit("fileNameChange", fileName);
            this.$store.commit("createFileURL", URL.createObjectURL(this.file));
        },
        async poster(){
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
                console.log(file)
                let infoCreatePost = JSON.stringify({Post,file}) 
                console.log(infoCreatePost)
                await this.$store.dispatch('createPost', infoCreatePost)
                .then((response) =>{
                        console.log(response)
                }).catch((error)=>{
                        console.log(error);
                })
                await this.$store.dispatch("getAllPosts")
                this.$router.push({ name: "post", params: {postid: postID } })
                return;
            };
        },
    },
};  

</script>
<style scoped>
textarea{
    height: 120px;
}
</style>
