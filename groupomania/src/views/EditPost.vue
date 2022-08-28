<template>
    <div class="create">
        <HeaderConnected />
        <h1>Modifier un post</h1>
        <div class="container">
            <p class="textDownload"> Télécharger une image</p>
            <input type="file" class="fileSubmit" ref="myFiles" @change="previewFiles" accept="image/png, image/jpeg, image/jpg">
            <p class="titleDescription"> Ecrivez votre publication juste en dessous</p>
            <textarea v-model="description" id="description"/>
            <button @click="poster" class="btn" :class="{'button--disabled' : !validatedFields}">Poster</button>
        </div>
    </div>
</template>

<script>
import HeaderConnected from "../components/HeaderConnected.vue"
import { mapState } from "vuex"

export default {
    name: "EditPost",
    data() {
        return {
        };
    },
    components: {HeaderConnected},
    mounted(){
        if(this.$store.state.user.userId == -1){
            this.$router.push('/login')
            return;
        }
    },
    computed:{
        ...mapState({
            user: 'userInfos',
        }),
    },
}   

</script>
<style scoped>

</style>
