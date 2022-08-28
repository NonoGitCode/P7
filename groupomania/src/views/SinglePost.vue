<template>
    <div class="body">
        <HeaderConnected />
            <div class="container" >
                <p class="pseudo"> {{ pseudo }} </p>
                    <img src="../assets/test.jpg"  class="ImgPost"/>
                <p class="description"> {{ description }} 
                </p>
                <!-- <a><font-awesome-icons icon ="faThumbsUp"/></a> -->
                <div class= "postFooter"> 
                    <a class="numberOfLikes"> {{ numberOfLikes }} </a>
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
            description: "description2 La règle @ @font-face permet de définir les polices d'écriture à utiliser pour afficher le texte de pages web. Cette police peut être chargée depuis un serveur distant ou depuis l'ordinateur de l'utilisateur. Si la fonction local() est utilisée, elle indique à l'agent utilisateur de prendre en compte une police présente sur le poste de l'utilisateur.",
            imageUrl: "#",
            pseudo: "jean",
            numberOfLikes: 0
        };
    },
    components: {HeaderConnected},
    mounted(){
        if(this.$store.state.user.userId == -1){
            this.$router.push('/login')
            return;
        }
    },
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
        beforeDestroy(){
            this.$store.commit("grantAdmin", null)
        },
        ...mapState(['status'])
    },
    methods:{
        editPost(){
            if(this.$store.state.isAdmin == true){
                this.$router.push('/edit')
            } else {
                console.log("test")
            }
        },
        deletePost(){
            if(this.$store.state.isAdmin == true){
                console.log('yes')
                this.$router.push('/')
            } else {
                console.log('nope')
            }
        }
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
