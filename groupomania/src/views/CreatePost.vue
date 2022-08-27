<template>
    <div class="create">
        <HeaderConnected />
        <h1>Créer un nouveau post</h1>
        <div class="CreatePost">
            <p class="textDownload"> Télécharger une image</p>
            <input type="file" class="fileSubmit" ref="myFiles" @change="previewFiles" accept="image/png, image/jpeg, image/jpg">
            <p class="titleDescription"> Ecrivez votre publication juste en dessous</p>
            <textarea v-model="description" id="description"/>
            <button @click="poster" class="btn" :class="{'button--disabled' : !validatedFields}">Poster</button>
        </div>
    </div>
</template>

<script>

import HeaderConnected from "../components/HeaderConnected.vue"


export default {
    name: "CreatePost",
    data() {
        return {
            description:"",

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
        validatedFields() {
            if (this.description != ""){
                return true;
            } else {
                return false
            }
        },
    },
    methods:{
        previewFiles(){
            this.files = this.$refs.myFiles.files
        },
        poster(){
           const self = this;
           this.$store.dispatch('poster',{
            imgUrl: this.files,
            description: this.description
           }).then((response) =>{
                self.$router.push("/")
                console.log(response)
           }).catch((error)=>{
                console.log(error);
           })
        }
    }
}   

</script>
<style scoped>
    .CreatePost{
        display: flex;
        flex-direction: column;
        margin: auto;
        max-width: 600px;
        border-radius: 15px;
        padding: 15px;
        margin-top: 90px;
        background-color: #FFD7D7;
        box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.2);
    }
    .CreatePost:hover{
         box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.4) 
    }
    .create{
        background-color: rgb(231, 231, 231);
        padding-bottom: 400px;
    }
    h1{
        text-align: center;
        margin-top: 60px;
    }
    .btn{
        background-color: #f86143;
        margin: auto;
        margin-top: 15px;
        width: 150px;
        border: none;
    }
    .btn:hover{
        background-color: rgb(255, 42, 0);
        cursor: pointer;
    }
    .button--disabled {  
        background-color: #cccccc; 
        color: #666666; 
        cursor: no-drop;
    }
    .button--disabled:hover{
        color: #505050;
        background-color: #cccccc;
        cursor: no-drop;
    }
    .titleDescription{
        margin-bottom: 2px;
        margin-top: 25px;
    }
    .fileSubmit{
        margin: auto;
        margin-top: -5px
    }
    .textDownload{
        margin-top: -5px;
    }
    textarea{
        border: none;
        min-height: 90px;
    }
</style>
