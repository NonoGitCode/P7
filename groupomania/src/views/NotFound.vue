<template>
    <div>
        <HeaderLogin />
        <div class="body">
            <h1>Oh Oh, erreur 404, la page à laquelle vous tentez d'acceder n'existe pas</h1>
            <div  class=centered>
                <router-link to="/" class="link">Retour à l'accueil</router-link>
            </div>
        </div>
    </div>    
</template>

<script>
import HeaderLogin from '../components/HeaderLogin.vue';


export default {
    name: "NotFound",
    components: {HeaderLogin},
    mounted(){
        if(this.$store.state.userId == -1){
            this.$router.push('/login')
            return;
        };
    },
}   
</script>

<style scoped>
    .link{
        font-size: 22px;
    }
</style>