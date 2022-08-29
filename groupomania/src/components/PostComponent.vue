<template>
    <div class="container">
    <!-- <div class="container" v-if="currentBlog"> -->
        <p class="pseudo"> {{ this.post.pseudo }} </p>
            <!-- <img :src=".../backend/images/{{  }}"  class="ImgPost"/> -->
        <p class="description"> {{ this.post.description }} </p>
        <!-- <a><font-awesome-icons icon ="faThumbsUp"/></a> -->
        <div class= "postFooter"> 
            <a class="NumberLikes"> {{ this.post.numberOfLikes }} </a>
            <router-link :to="{name: 'post', params: { id: this.post._id } }" class="link">Aller au poste</router-link>
        </div>
    </div>
</template>

<script>
// import likeIcon from "../assets/like-svgrepo-com.svg";

export default {
    name: 'post',
    props: ["post"],
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