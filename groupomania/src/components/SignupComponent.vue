<template>
    <div>
        <HeaderComponent />
        <div class="signup">
            <div class="pseudo">
                <label for="pseudo">Pseudo</label>
                <input type="text" v-model="Pseudo" id="pseudo"/>
                <!-- <p>Merci de saisir un email valide</p> -->
            </div>
            <LoginComponent />
        </div>
        <button class="btn">Inscription</button>
    </div>
</template>

<script>
import LoginComponent from './LoginComponent.vue'
import HeaderComponent from './HeaderComponent.vue';
import HeaderComponent from './HeaderComponent.vue';


export default {
    name: "App",
    components: { LoginComponent, HeaderComponent },
    Data(){
        return{
            Pseudo:'',
        }
    }
}   
</script>


