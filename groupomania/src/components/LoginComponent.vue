<template>
<div>
    <HeaderComponent />
    <div class="login">
        <div class="email">
            <label for="email">Email</label>
            <input type="email" v-model="email" id="email"/>
            <a>Merci de saisir un email valide</a> 
        </div>
        <div class="password">
            <label for="password">Mot de passe</label>
            <input type="text" v-model="password" id="password"/>
             <a>Merci de saisir un email valide</a> 
        </div>
    <button class="btn">Connexion</button>
    </div>
</div>    
</template>

<script>
import HeaderComponent from './HeaderComponent.vue';


export default {
    name: "App",
    data() {
        return {
            login: "",
            password: "",
        };
    },
    components: { HeaderComponent }
}   
</script>
<style>
    .login{
        border: 1px solid black;
        margin: auto;
        margin-top: 50px;
        max-width: 300px;
        height: 200px;
        border-radius: 15px;
        padding: 15px;
    }
</style>