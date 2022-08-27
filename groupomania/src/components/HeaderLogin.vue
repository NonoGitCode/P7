<template>
    <div class="Header">
        <a href="#">
            <img src="..\assets\icon-left-font-monochrome-white.png"  class="logo"/>
        </a>
        <nav>
            <router-link to="/login" class="link">Login</router-link>
            <router-link to="/signup" class="link">Inscription</router-link>
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