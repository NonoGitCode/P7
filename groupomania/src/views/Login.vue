<template>
<div>
    <HeaderLogin />
    <div class="body">
        <h1>Connexion</h1>
        <h3 v-if="status == 'error_login'" class="error centered">Paire Email/Mot de passe incorrecte</h3>
        <div class="container">
            <div class="createAccount">
                <a>Vous n'avez pas de compte?</a>
                <router-link to= "/signup" class="link">Créer un compte</router-link>
            </div>
            <div class="email">
                <label for="email">Email</label>
                <br>
                <input type="email" v-model="email" id="email" @change="checkEmail"/>
                <p class="error" v-show="wrongEmail">Merci de saisir un email valide </p> 
            </div>
            <div class="password">
                <label for="password">Mot de passe</label>
                <br>
                <input type="password" v-model="password" id="password" @change="checkPassword"/>
                <p class="error" v-show="wrongPassword"> Merci de saisir un mot de passe valide</p> 
            </div>
        <button @click.prevent="login" class="btn" :class="{'button--disabled' : !validatedFields}">Connexion</button>
        </div>
    </div>
</div>    
</template>

<script>
import HeaderLogin from '../components/HeaderLogin.vue';
import { mapState } from 'vuex';
const passwordRegex = /^[A-Za-zâêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{3,50}$/;
const mailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;


export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            wrongEmail: false,
            wrongPassword: false
        };
    },
    components: {HeaderLogin},
    computed:{
        validatedFields() {
            if (this.email != "" && this.password != ""  && this.wrongEmail == false && this.wrongPassword == false){
                return true;
            } else {
                return false
            }
        },
        ...mapState(['status']),
    },
    mounted() {
        if(this.$store.state.user.userId != -1){
            this.$router.push('/')
            return;
        }
    },
    methods:{
         async login(){
            if(this.email != "" && this.password != "" && this.wrongEmail == false && this.wrongPassword == false){
                const self = this;
                 await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                }).then((response) => {
                    self.$router.push('/')
                    console.log(response)
                }).catch((error) => {
                    console.log(error);
                })
            }
        },
        checkEmail (){
            if(mailRegex.test(this.email)){
                this.wrongEmail = false;
            } else {
                this.wrongEmail = true;
            }
        },
        checkpassword (){
            if(passwordRegex.test(this.password)){
                this.wrongPassword = false;
            } else {
                this.wrongPassword = true;
            }
        }    
    }
}   
</script>
<style scoped>
    .email{
        margin-bottom: 20px;
        margin-top: 10px;
    }
    .password{
        margin-bottom: 10px;
    }
    .createAccount{
        display: flex;
        flex-direction: row;
        align-items: baseline;
        margin-bottom: 7px;   
    }
</style>
