<template>
<div>
    <HeaderConnected/>
    <div class="body">
        <h1>Postes récents</h1>
       <PostComponent />
    </div>
</div>
</template>

<script>
import HeaderConnected from "../components/HeaderConnected.vue"
import PostComponent from "../components/PostComponent.vue"
export default {
    name:"Home",
    data(){
        return{
            
            }
    },
    components: { HeaderConnected, PostComponent },
}
</script>

<style>
.body{
   background-color: rgb(231, 231, 231)
}
h1{
    margin-bottom: -5px;
}
</style>