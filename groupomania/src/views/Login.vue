<template>
<div>
    <HeaderLogin />
    <div class="body">
        <h1>Connexion</h1>
        <div class="login">
            <div class="email">
                <label for="email">Email</label>
                <br>
                <input type="email" v-model="email" id="email"/>
                <p class="error">Merci de saisir un email valide</p> 
            </div>
            <div class="password">
                <label for="password">Mot de passe</label>
                <br>
                <input type="text" v-model="password" id="password"/>
                <p class="error">Merci de saisir un email valide</p> 
            </div>
        <button class="btn">Connexion</button>
        </div>
    </div>
</div>    
</template>

<script>
import HeaderLogin from '../components/HeaderLogin.vue';


export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    components: {HeaderLogin}
}   
</script>
<style>
    .login{
        border: 1px solid black;
        margin: auto;
        margin-top: 50px;
        max-width: 300px;
        height: 195px;
        border-radius: 15px;
        padding: 15px;
        margin-bottom: 270px;
        display: flex;
        flex-direction: column;
        background-color: #FFD7D7
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
        margin-top: 30px;
        width: 150px;
        border: solid 1px #000000;
    }
    .btn:hover{
        background-color: rgb(255, 42, 0);
        cursor: pointer;
    }
</style>
