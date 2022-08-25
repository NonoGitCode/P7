<template>
    <div class="create">
        <HeaderConnected />
        <h1>Créer un nouveau post</h1>
        <div class="CreatePost">
            <input type="file" class="fileSubmit">
            <p class="titleDescription"> Ecrivez votre publication juste en dessous</p>
            <textarea v-model="Description" id="description"/>
            <button class="btn">Poster</button>
        </div>
    </div>
</template>

<script>

import HeaderConnected from "../components/HeaderConnected.vue"

export default {
    name: "CreatePost",
    data() {
        return {
            Description:" "
        };
    },
    components: {HeaderConnected},


}   

</script>
<style>
    .CreatePost{
        display: flex;
        flex-direction: column;
        margin: auto;
        max-width: 600px;
        border: 2px solid black;
        border-radius: 15px;
        padding: 15px;
        margin-top: 100px;
        background-color: #FFD7D7
    }
    .create{
        background-color: rgb(231, 231, 231);
        padding-bottom: 400px;
    }
    h1{
        text-align: center;
        margin-top: 60px;
    }
    .btn{
        background-color: #f86143;
        margin: auto;
        margin-top: 15px;
        width: 150px;
        border: solid 1px #000000;
    }
    .btn:hover{
        background-color: rgb(255, 42, 0);
        cursor: pointer;
    }
    .titleDescription{
        margin-bottom: -2px;
    }
    .fileSubmit{
        margin: auto;
    }
</style>
