<template>
    <div>
        <HeaderLogin />
        <div class="body">
            <h1>Oh Oh, erreur 404, la page à laquelle que vous tentez d'acceder n'existe pas</h1>
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
    components: {HeaderLogin}
}   
</script>

<style scoped>
    h1{
        text-align: center;
        margin-top: 200px;
        margin-bottom: 200px;
    }
    .link{
        color: #000000;
        margin-bottom: 50px;
    }
    .centered{
        text-align: center
    }
</style>