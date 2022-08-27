<template>
    <div class="body">
        <router-link :to="{name: 'post' /*, params : {id : post.id}*/}" >
            <div class="posts" >
                    <p class="pseudo"> Pseudo </p>
                        <img src= "#"  class="ImgPost"/>
                    <p class="description"> ceci est une Description 
                    </p>
                    <!-- <a><font-awesome-icons icon ="faThumbsUp"/></a> -->
                    <a class="NumberLikes"> NumberOfLikes </a>
                    <!-- <font-awesome-icon icon="fa-regular fa-thumbs-up" /> -->
            </div>
        </router-link>
    </div>
</template>

<script>

export default {
    name: 'post',
    props: ['id'],
    data(){
        return {
            Pseudo:'',
            Description:'',
            imgUrl: '',
            NumberOfLikes: 0,
        }
    }
}
</script>

<style>
.posts{
    box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.2);
    margin: 30px auto;
    max-width: 500px;
    border-radius: 25px;
    padding: 7px 15px;
    background-color: #FFD7D7;
    display: flex;
    flex-direction: column;
    text-align: justify;
    text-justify: inter-word;
}
.posts:hover{
    box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.4)
}
.postLink{
    color: #000000;
    text-decoration: none;
}
.ImgPost{
    max-width: 300px;
    object-fit: cover;
    margin-left: 22%;
    margin-right: 22%;
}
.pseudo{
    font-size: 1rem;
    margin-bottom: 10px;
}
.body{
    background-color: rgb(231, 231, 231);
    padding: 15px;
}
.description{
    display: flex;
    justify-content: center;
}

</style>