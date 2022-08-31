<template>
    <div class="container">
    <!-- <div class="container" v-if="currentBlog"> -->
        <p class="pseudo"> {{ this.correctOrder.pseudo }} </p>
            <img :src="this.correctOrder.imageUrl"  class="ImgPost"/>
        <p class="description"> {{ this.correctOrder.description }} </p>
        <!-- <a><font-awesome-icons icon ="faThumbsUp"/></a> -->
        <div class= "postFooter"> 
            <a class="NumberLikes"> {{ this.correctOrder.likes }} </a>
           
            <router-link :to="{name: 'post', params: { id: this.correctOrder._id } }" class="link">Aller au poste</router-link>
        </div>
    </div>
</template>

<script>
// import likeIcon from "../assets/like-svgrepo-com.svg";

export default {
    name: 'post',
    props: ["correctOrder"],
    data(){
        return {
            
        }
    },
    // components: { 
    //     likeIcon 
    // }
}
</script>


<style scoped>
.pseudo{
    margin-bottom: 10px;
    margin-top: 0px;
}

.postFooter{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
}
</style>