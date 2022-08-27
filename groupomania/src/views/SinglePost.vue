<template>
    
</template>

<script>

import HeaderConnected from "../components/HeaderConnected.vue"

export default {
    name: "LikePost",
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
}   

</script>
<style scoped>

</style>
