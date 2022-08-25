<template>
    <div class="Header">
        <a href="#">
            <img src="..\assets\icon-left-font-monochrome-white.png"  class="logo"/>
        </a>
        <div>
            <router-link to="/" class="link">Home</router-link>
            <router-link to ="/create" class="link">Créer un post</router-link>
            <router-link to ="/login" class="link">Déconnexion </router-link>
        </div>
    </div>
</template>


<style>
.Header{
    display: flex;
    align-items: center;
    background-color: #4E5166;
    justify-content: space-between;
    padding: 15px;
}
.logo{
    width: 300px;
    max-height: 110px;
    object-fit: cover;
}
.link{
    text-decoration: none;
    color: #ffffff;
    margin:15px;
    font-size: 1.2rem;  
}
.link:hover{
    text-decoration: underline;
}
</style>