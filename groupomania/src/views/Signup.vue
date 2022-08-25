<template>
    <div>
        <HeaderLogin />
        <div class="body">
            <h1>Inscription</h1>
            <div class="signup">
                <div class="pseudo">
                    <label for="pseudo">Pseudo</label>
                    <input type="text" v-model="Pseudo" id="pseudo"/>
                    <br />
                    <span class="error">Merci de saisir un email valide</span> 
                </div>
                <div class="email">
                    <label for="email">Email</label>
                    <input type="email" v-model="Email" id="email"/>
                    <br />
                    <span class="error">Merci de saisir un email valide</span> 
                </div>
                <div class="password">
                    <label for="password">Mot de passe</label>
                    <br>
                    <input type="text" v-model="Password" id="password"/>
                    <br />
                    <span class="error">Merci de saisir un email valide</span> 
                </div>
                <button class="btn" @click="SubmitForm">Inscription</button>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderLogin from '../components/HeaderLogin.vue';


export default {
    name: "Signup",
    components: { HeaderLogin },
    Data(){
        return{
            Pseudo:'',
            Email:'',
            Password:'',
        }
    },
    methods:{
        SubmitForm(){
            this.$emit('SubmitForm',{
                body:{
                    Pseudo: Pseudo,
                    Email: Email,
                    Password: Password,
                },
                
            })
            console.log(body)
        }
    }
}   
</script>
<style>
    .signup{
        border: 1px solid black;
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
    .btn{
        background-color: #f86143;
        margin-top: 30px;
        width: 150px;
        border: solid 1px #000000;
    }
    .btn:hover{
        background-color: rgb(255, 42, 0);
        cursor: pointer;
    }
    .email{
        margin-bottom: 10px;
        margin-top: 0px;
    }
</style>


