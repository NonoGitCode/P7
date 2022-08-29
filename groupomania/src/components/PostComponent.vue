<template>
    <div class="container">
    <!-- <div class="container" v-if="currentBlog"> -->
        <p class="pseudo"> {{ post.pseudo }} </p>
            <img :src = post.imgUrl  class="ImgPost"/>
        <p class="description"> {{ post.description }} </p>
        <!-- <a><font-awesome-icons icon ="faThumbsUp"/></a> -->
        <div class= "postFooter"> 
            <a class="NumberLikes"> {{post.numberOfLikes}} </a>
            <router-link to="/post/:id" class="link">Aller au poste</router-link>
            <!-- <router-link :to="{name: 'post', params: { postid: this.post.postID } }" class="link">Aller au poste</router-link> -->
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
            Pseudo:'',
            Description:'',
            imgUrl: '',
            NumberOfLikes: 0,
            postID:0
            //dynamiser la récupération des infos du fetch
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