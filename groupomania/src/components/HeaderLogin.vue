<template>
    <div class="Header">
        <a href="#">
            <img src="..\assets\icon-left-font-monochrome-white.png"  class="logo"/>
        </a>
        <nav>
            <router-link to="/login" class="linkHeader">Login</router-link>
            <router-link to="/signup" class="linkHeader">Inscription</router-link>
        </nav>
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
}
.linkHeader{
    text-decoration: none;
    color: #ffffff;
    margin:15px;
    font-size: 1.2rem;  
}
.linkHeader:hover{
    text-decoration: underline;
}
</style>