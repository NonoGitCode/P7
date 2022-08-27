<template>
<div>
    <HeaderLogin />
    <div class="body">
        <h1>Connexion</h1>
        <h3 v-if="status == 'error_login'" class="errorConnexion">Paire Email/Mot de passe incorrecte</h3>
        <div class="login">
            <div class="createAccount">
                <a>Vous n'avez pas de compte?</a>
                <router-link to= "/signup" class="newLink">Créer un compte</router-link>
            </div>
            <div class="email">
                <label for="email">Email</label>
                <br>
                <input type="email" v-model="email" id="email"/>
                <p class="error">Merci de saisir un email valide</p> 
            </div>
            <div class="password">
                <label for="password">Mot de passe</label>
                <br>
                <input type="password" v-model="password" id="password"/>
                <p class="error">Merci de saisir un email valide</p> 
            </div>
        <button @click="login" class="btn" :class="{'button--disabled' : !validatedFields}">Connexion</button>
        </div>
    </div>
</div>    
</template>

<script>
import HeaderLogin from '../components/HeaderLogin.vue';
import { mapState } from 'vuex'


export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    components: {HeaderLogin},
    computed:{
        validatedFields() {
            if (this.email != "" && this.password != ""){
                return true;
            } else {
                return false
            }
        },
        ...mapState(['status'])
    },
    mounted() {
        if(this.$store.state.user.userId != -1){
            this.$router.push('/')
            return;
        }
    },
    methods:{
        login(){
            const self = this;
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            }).then((response) => {
                self.$router.push('/')
                console.log(response)
            }).catch((error) => {
                console.log(error);
            })
        }
    }
}   
</script>
<style>
    .login{
        box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.2);
        margin: auto;
        margin-top: 50px;
        max-width: 300px;
        height: 215px;
        border-radius: 15px;
        padding: 15px;
        margin-bottom: 270px;
        display: flex;
        flex-direction: column;
        background-color: #FFD7D7
    }
    .login:hover{
        box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.4) 
    }
    .body{
        background-color: rgb(231, 231, 231);
    }
    input{
        width: 97%;
    }
    .error{
        color: red;
        margin: 3px;
    }
    .email{
        margin-bottom: 20px;
        margin-top: 10px;
    }
    .password{
        margin-bottom: 10px;
    }
    .btn{
        background-color: #f86143;
        margin: auto;
        margin-top: 15px;
        width: 150px;
        border: none;
        border-radius: 10px;
        padding: 5px;
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
    .createAccount{
        display: flex;
        flex-direction: row;
        align-items: baseline;
        margin-bottom: 7px;   
    }
    .newLink{
        color: #0c42cb;
        margin-left: 5px;
        text-decoration: none;
    }
    .newLink:hover{
        text-decoration: underline;
    }
    h1{
        text-align: center;
    }
    .errorConnexion{
        color: red;
        text-align: center;
    }
</style>
