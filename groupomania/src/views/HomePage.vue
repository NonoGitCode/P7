<template>
<div class="home">
    <HeaderConnected/>
    <div class="body">
        <h1>Postes récents</h1>
       <PostComponent :post="post" v-for="(post, index) in post" :key="index" />
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import HeaderConnected from "../components/HeaderConnected.vue"
import PostComponent from "../components/PostComponent.vue"


export default {
    name:"Home",
    data(){
        return{
            post: [
                {
                    description: "description2 La règle @ @font-face permet de définir les polices d'écriture à utiliser pour afficher le texte de pages web. Cette police peut être chargée depuis un serveur distant ou depuis l'ordinateur de l'utilisateur. Si la fonction local() est utilisée, elle indique à l'agent utilisateur de prendre en compte une police présente sur le poste de l'utilisateur.",
                    imageUrl: "#",
                    pseudo: "jean",
                    numberOfLikes: 0,
                    postID: 1,
                },
                {
                    description: "description3",
                    imageUrl: "#",
                    pseudo: "jean",
                    numberOfLikes: 5,
                    postID: 2,
                },
                {
                    description: "description4",
                    imageUrl: "#",
                    pseudo: "jean",
                    numberOfLikes: 10,
                    postID: 3,
                }
            ],
        }
    },
    mounted(){
        if(this.$store.state.user.userId == -1){
            this.$router.push('/login')
            return;
        }
    },
    computed:{
        async getAllPosts(){
            await this.$store.dispatch('getAllPosts')
            .then((response) => {
                myObj = JSON.stringify(response)
                console.log(response)
            }).catch((error) => {
                console.log(error);
            })
        },
        ...mapState(['status'])
    },
    components: { HeaderConnected, PostComponent },
}
</script>

<style scoped>

</style>