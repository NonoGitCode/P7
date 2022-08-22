<template>
    <div class="Header">
        <a href="#">
            <img src="../assets/icon-left-font.png"  class="logo"/>
        </a>
        <a  class= "link" href="#"> Login </a>
        <a class= "link" href="#"> Register </a>
    </div>
</template>


<style>
    .logo{
        width: 10%;
        max-height: 80px;
        object-fit: cover;
    };
    .Header{
        display: flex;
        align-items:baseline;
    };
    .link{
        text-decoration: none;
    };
</style>