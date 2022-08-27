<template>
    <div>
        <HeaderLogin />
        <div class="body">
            <h1>Inscription</h1>
             <h3 v-if="status == 'error_create'" class="errorConnexion">Email déjà utilisé</h3>
            <form  @submit.prevent="onSubmit" class="signup">
                <div class="pseudo">
                    <label for="pseudo">Pseudo</label>
                    <input type="text" v-model="pseudo" id="pseudo"/>
                    <br />
                    <span class="error">Merci de saisir un pseudo valide</span> 
                </div>
                <div class="email">
                    <label for="email">Email</label>
                    <input type="email" v-model="email" id="email"/>
                    <br />
                    <span class="error">Merci de saisir un email valide</span> 
                </div>
                <div class="password">
                    <label for="password">Mot de passe</label>
                    <input type="password" v-model="password" id="password"/>
                    <br />
                    <span class="error">Merci de saisir un mot de passe valide</span> 
                </div>
                <button @click="createAccount" class="button" :class="{'button--disabled' : !validatedFields}">Inscription</button>
            </form>
        </div>
    </div>
</template>

<script>
import HeaderLogin from '../components/HeaderLogin.vue';
import { mapState } from 'vuex'


export default {
    name: "Signup",
    components: { HeaderLogin },
    data(){
        return {
            pseudo:'',
            email:'',
            password:''
        }
    },
    computed:{
        validatedFields() {
            if (this.email != "" && this.password != "" && this.pseudo != ""){
                return true;
            } else {
                return false
            }
        },
        ...mapState(['status'])
    },
    methods:{
        createAccount(){
            const self = this;
            this.$store.dispatch('createAccount', {
            pseudo: this.pseudo,
            email: this.email,
            password: this.password
            }).then((response) => {
                self.$router.push('/login')
                console.log(response)
            }).catch((error) => {
                console.log(error);
            })
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
    .signup{
        /* border: 1px solid black; */
        box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.2);
        margin: auto;
        margin-top: 50px;
        max-width: 300px;
        height: 240px;
        border-radius: 15px;
        padding: 15px;
        margin-bottom: 200px;
        background-color: #FFD7D7;
        display: flex;
        flex-direction: column;
    }
    .signup:hover{
       box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.4) 
    }
    .button{
        background-color: #f86143;
        margin-top: 20px;
        margin: auto;
        width: 150px;
        border: none;
        border-radius: 10px;
        padding: 5px;
    }
    .button:hover{
        background-color: rgb(255, 42, 0);
        cursor: pointer;
    }
    .email{
        margin-bottom: 10px;
        margin-top: 0px;
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
    input{
        border: none;
        margin-top: 3px;
        border-radius: 5px;
    }

</style>


