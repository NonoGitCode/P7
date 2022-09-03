<template>
    <div class="create">
        <HeaderConnected />
        <h1>Modifier un post</h1>
        <div class="container">
            <p class="textDownload"> Télécharger une image</p>
            <p class="small" v-if="fileadded">Vous n'êtes pas obligé de charger une nouvelle image si vous souhaitez garder l'ancienne</p>
            <input type="file" class="fileSubmit" ref="postPhoto" @change="fileChange" accept=".png, .jpeg, .jpg">
            <p class="titleDescription"> Ecrivez votre publication juste en dessous</p>
            <textarea v-model="postDescription" placeholder="Ecrivez votre publication ici" id="description"/>
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
            post: [],
            currentPost: null,
            fileadded: true,
            file: null,

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
        let currentId = id.substr(34,200)
        await this.$store.dispatch('getOnePost', currentId)
        this.post = this.$store.state.currentPost
        this.postDescription = this.post.description
    },
    computed:{
        ...mapState({
            user: 'userInfos',
        }),
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
    },
    methods:{
        fileChange(){
            this.file = this.$refs.postPhoto.files[0];
            const fileName = this.file.name
            this.$store.commit("fileNameChange", fileName);
            this.$store.commit("createFileURL", URL.createObjectURL(this.file));
            this.$store.commit('fileInfo', this.file)
            this.fileadded = false
        },
        async modifyPost(){
            let user = localStorage.getItem('user');
            user = JSON.parse(user)
            if(this.$store.state.user.level >= 1 || user.userId == this.post.userId){
                if (this.postDescription != ""){
                    if(this.$store.state.postInfo != ""){
                        let formData = new FormData();
                    formData.append('image', this.$store.state.PostInfo);
                    formData.append('Post', JSON.stringify({
                        description: this.$store.state.postDescription,
                        pseudo: this.$store.state.user.pseudo,
                    }))
                        const id = new URL(window.location.href).href
                        let currentId = id.substr(34,200)
                        let data = {
                            data: formData,
                            id: currentId
                        }
                        await this.$store.dispatch('modifyPost', data)
                        .then((response) =>{
                                console.log(response)
                        }).catch((error)=>{
                                console.log(error);
                        })
                        this.$store.commit("updatePostDescription", null)
                        this.$router.push("/")
                        return;
                    } else {
                        const id = new URL(window.location.href).href
                        let currentId = id.substr(34,200)
                        let formData = {
                            description: this.$store.state.postDescription,
                            pseudo: this.$store.state.user.pseudo,
                            currentId: currentId
                        }
                        await this.$store.dispatch('modifyPost', formData, currentId)
                        .then((response) =>{
                                console.log(response)
                        }).catch((error)=>{
                                console.log(error);
                        })
                        this.$store.commit("updatePostDescription", null)
                        this.$router.push("/")
                        return;
                    }
                }
                
            }
        },
    },
    beforeDestroy(){
        this.$store.commit("updatePostDescription", null)
        this.$store.commit("grantAdmin", false)
        this.$store.commit("setStatusLike", null)
    },
    
};  

</script>
<style scoped>

</style>
