<template>
    <div class="create">
        <HeaderConnected />
        <h1>Créer un nouveau post</h1>
        <div class="container">
            <p class="textDownload"> Télécharger une image</p>
            <input type="file" class="fileSubmit" ref="postPhoto" @change="fileChange" accept=".png, .jpeg, .jpg">
            <p class="titleDescription"> Ecrivez votre publication juste en dessous</p>
            <textarea v-model="postDescription" placeholder="Ecrivez votre publication ici" id="description"/>
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
            if (this.postDescription != ""){
                return true;
            } else {
                return false
            };
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
            this.$store.commit('fileInfo', this.file)
        },
        async poster(){
            if (this.postDescription != "" && this.$store.state.postPhotoName !=""){
                let formData = new FormData();
                    formData.append('image', this.$store.state.PostInfo);
                    formData.append('Post', JSON.stringify({
                        description: this.$store.state.postDescription,
                        pseudo: this.$store.state.user.pseudo,
                    }))
                await this.$store.dispatch('createPost', formData)
                .then((response) =>{
                        console.log(response)
                        this.$store.commit("updatePostDescription", null)
                }).catch((error)=>{
                        console.log(error);
                })
                this.$router.push('/')
                return;
            } else {
                if(this.postDescription != "" && this.$store.state.postPhotoName =="" ){
                    let formData = {
                        description: this.$store.state.postDescription,
                        pseudo: this.$store.state.user.pseudo,
                    }
                    await this.$store.dispatch('createPost', formData)
                .then((response) =>{
                        console.log(response)
                        this.$store.commit("updatePostDescription", null)
                }).catch((error)=>{
                        console.log(error);
                })
                this.$router.push('/')
                return;
                }
            }
        },
    },
};  

</script>
<style scoped>

</style>
