<template>
    <div>
        <HeaderLogin />
        <div class="body">
            <h1>Inscription</h1>
             <h3 v-if="status == 'error_create'" class="errorConnexion">Email déjà utilisé</h3>
            <div class="container">
                <div class="pseudo">
                    <label for="pseudo">Pseudo</label>
                    <input type="text" v-model="pseudo" id="pseudo" @change="checkPseudo"/>
                    <br >
                    <p class="error" v-show="wrongPseudo">Merci de saisir un pseudo valide</p> 
                </div>
                <div class="email">
                    <label for="email">Email</label>
                    <input type="email" v-model="email" id="email" @change="checkEmail"/>
                    <br >
                    <p class="error" v-show="wrongEmail">Merci de saisir un email valide</p> 
                </div>
                <div class="password">
                    <label for="password">Mot de passe</label>
                    <input type="password" v-model="password" id="password" @change="checkPassword"/>
                    <br >
                    <p class="error" v-show="wrongPassword">Merci de saisir un mot de passe valide</p> 
                </div>
                <button @click.prevent="createAccount" class="btn" :class="{'button--disabled' : !validatedFields}">Inscription</button>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderLogin from '../components/HeaderLogin.vue';
import { mapState } from 'vuex'
const passwordRegex = /^[A-Za-zâêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{3,50}$/;
const mailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

export default {
    name: "Signup",
    components: { HeaderLogin },
    data(){
        return {
            pseudo: "",
            email: "",
            password: "",
            wrongPseudo: false,
            wrongPassword: false,
            wrongEmail: false,
        }
    },
    computed:{
        validatedFields() {
            if (this.email != "" && this.password != "" && this.pseudo != "" && this.wrongPseudo == false && this.wrongPassword == false && this.wrongEmail == false){
                return true;
            } else {
                return false
            }
        },
        ...mapState(['status'])
    },
    methods:{
        async createAccount(){
            if (this.email != "" && this.password != "" && this.pseudo != "" && this.wrongPseudo == false && this.wrongPassword == false && this.wrongEmail == false){
                const self = this;
                await this.$store.dispatch('createAccount', {
                pseudo: this.pseudo,
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
        checkPassword (){
            if(passwordRegex.test(this.password)){
                this.wrongPassword = false;
            } else {
                this.wrongPassword = true;
            }
        },
        checkPseudo (){
            if(passwordRegex.test(this.pseudo)){
                this.wrongPseudo = false;
            } else {
                this.wrongPseudo = true
            }
        }
    },
    mounted() {
        if(this.$store.state.user.userId != -1){
            this.$router.push('/')
            return;
        }
        
    },
}
</script>
<style>

</style>


