<template>
    <div class="body">
        <div class="posts">
            <a href="#" class="postLink">
                <p class="pseudo">Jean2larue</p>
                    <img src="..\assets\test2jpg.jpg" class="ImgPost"/>
                <p class="description">Ceci est une description blah blah blah blah
                </p>
                <!-- <a><font-awesome-icons icon ="faThumbsUp"/></a> -->
                <a class="NumberLikes">0</a>
                <!-- <font-awesome-icon icon="fa-regular fa-thumbs-up" /> -->
            </a>
        </div>
        <div class="posts">
            <a href="#" class="postLink">
                <p class="pseudo">Nono22</p>
                <img src="..\assets\test.jpg" class="ImgPost"/>
                <p class="description">Ceci est une description blah blah blah blah sdfhgsdfhnfghngnfngfgnfs gfbdhnrsnb df shrseth gfhdhbkjjsroib ferghkgjbhnoiugbh rgedoikjgjhodslikjgb dfkljgjhsolikfdjgh fdsmolgjflskijhb dfmlkihglfskbj dfmlkgjdflikhbgjb dmflslkhbdflgkbh 
                </p>
                <!-- <a><font-awesome-icons icon ="faThumbsUp"/></a> -->
                <a class="NumberLikes">0</a>
            </a>
        </div>
        <div class="posts">
            <a href="#" class="postLink">
                <p class="pseudo">FranckCompta</p>
                <img src="#"/>
                <p class="description">Ceci est une description blah blah blah blah
                </p>
                <!-- <a><font-awesome-icons icon ="faThumbsUp"/></a> -->
                <a class="NumberLikes">0</a>
            </a>
        </div>
    </div>
</template>

<script>

export default {
    Data(){
        return {
            Pseudo:'',
            Description:'',
        }
    }
}
</script>

<style>
.posts{
    border: solid black 2px;
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