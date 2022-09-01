<template>
  <router-view></router-view>
</template>


<script>
export default {
  name: 'App',
}
</script>
<style>
body{
  margin: 0px
}
#app{
  font-family: 'Lato', sans-serif;
  background-color: rgb(231, 231, 231);
  padding-bottom: 50px;
}
h1 {
  text-align: center;
  margin-top: 60px;
}
h4 {
  text-align: center;
  margin-top: 16px;
}
p{
  font-size: 16px;
}
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
.pseudo{
  font-size: 18px;
}
.NumberLikes{
  font-size: 12px;
}
@media (max-width:715px){
  .logo{
    width: 150px;
  }
  nav{
    display: flex;
    flex-direction: column;
  }
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
.link{
  color: #0c42cb;
  margin-left: 5px;
  text-decoration: none;
}
.link:hover{
  text-decoration: underline;
}
.container{
  box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.2);
  background-color: #FFD7D7;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 600px;
  border-radius: 15px;
  padding: 15px;
  margin-top: 60px;
}
.container:hover{
  box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.4) 
}
.btn{
  background-color: #f86143;
  margin: auto;
  margin-top: 15px;
  width: 150px;
  border: none;
  border-radius: 10px;
  padding: 5px;
}
.btn:hover{
  background-color: rgb(255, 42, 0);
  cursor: pointer;
}
.button--disabled {  
  background-color: #cccccc; 
  color: #666666; 
  cursor: no-drop;
}
.button--disabled:hover{
  color: #505050;
  background-color: #cccccc;
  cursor: no-drop;
}
.centered {
  text-align: center
}
.error{
  color: red;
  margin: 3px;
}
input{
  width: 97%;
  border: none;
  border-radius: 5px;
  min-height: 20px;
  margin: 5px 0px;
}
textarea{
  height: 120px;
}
.ImgPost{
  max-width: 350px;
  object-fit: cover;
  margin-left: 22%;
  margin-right: 22%;
}
.small{
  margin: 0px;
  margin-top: -10px;
  font-size: 12px;
  color: #0c42cb;
}
.icon{
  margin-left: 5px;
  font-size: 18px;
  opacity: 0.7;
}
.icon:hover{
  cursor: pointer;
}
#iconLike{
  color: #0c42cb;
}
.numberOfLikes{
  margin-top: 15px;
}

</style>

