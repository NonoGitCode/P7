const Post = require('../models/Post');
const fs = require('fs');
const mongoose = require('mongoose');


//Fonction create Post qui va récuperer les informations dans le body de la requête selon le schema, elle va y ajouter l'URL de l'image généré ainsi que l'initialisation des likes et dislike
exports.createPost = (req, res, next) => {
    if(req.file){
        const PostObject = JSON.parse(req.body.Post);
        const postObj = new Post({
            ...PostObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            likes: 0,
            createTime: Date.now(),
            updateTime: Date.now(),
            usersLiked: [],
        });
        postObj.save()
            .then(() => { res.status(201).json({message: 'Post enregistrée !'})})
            .catch(error => { res.status(400).json( { error })})
    } else {
        const PostObject = req.body
        const postObj = new Post({
            ...PostObject,
            userId: req.auth.userId,
            likes: 0,
            createTime: Date.now(),
            updateTime: Date.now(),
            usersLiked: [],
        });
        postObj.save()
            .then(() => { res.status(201).json({message: 'Post enregistrée !'})})
            .catch(error => { res.status(400).json( { error })})
    }
};


//Fonction modify Post qui récupère les informations transmises dans le body et qui met à jour ce qui a été modifié (après avoir vérifié si l'utilisateur est bien le créateur de l'objet Post en premier lieu)
exports.modifyPost = (req, res, next) => {
    if(req.file != null){
        const PostObject = {
            ...JSON.parse(req.body.Post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            updateTime: Date.now()
        }
        if(req.auth.level >= 1){
            Post.findOneAndUpdate({_id: req.params.id}, PostObject)
            .then(() => res.status(200).json({ message: 'Post modififée 4 !'}))
            .catch((error)=> res.status(400).json({ error }));
        }else{
            Post.findOneAndUpdate({_id:req.params.id, userId:req.auth.userId}, PostObject)
            .then(() => res.status(200).json({ message: 'Post modififée 3 !'}))
            .catch((error)=> res.status(400).json({ error }));
        }
    }else{
        PostObject = req.body
        const postObj = {
            ...PostObject,
            updateTime: Date.now()
        }
        if(req.auth.level >= 1){
            Post.findOneAndUpdate({_id: req.params.id}, postObj)
            .then(() => res.status(200).json({ message: 'Post modififée 2 !'}))
            .catch((error)=> res.status(400).json({ error }));
        }else{
            Post.findOneAndUpdate({_id:req.params.id, userId:req.auth.userId}, postObj)
            .then(() => res.status(200).json({ message: 'Post modififée 1 !'}))
            .catch((error)=> res.status(400).json({ error }));
        }
    }

};

//fonction deletePost qui permet de suprimmer une Post de la base de donnée si la requête vient bien de l'utilisateur qui a créé cette Post
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
        .then(Post => {
            if(req.auth.level >= 1){
                if(typeof Post.imageUrl != "undefined"){
                    const filename = Post.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Post.deleteOne({_id: req.params.id})
                            .then(() => { res.status(200).json({message: 'Post supprimée !'})})
                            .catch(error => res.status(401).json({ error }));
                    });
                }else{
                    Post.deleteOne({_id: req.params.id})
                            .then(() => { res.status(200).json({message: 'Post supprimée !'})})
                            .catch(error => res.status(401).json({ error }));
                }
            }else{
                if (Post.userId != req.auth.userId) {
                    res.status(403).json({message: 'Not authorized'});
                } else {
                    if(typeof Post.imageUrl != "undefined"){
                        const filename = Post.imageUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            Post.deleteOne({_id: req.params.id})
                                .then(() => { res.status(200).json({message: 'Post supprimée !'})})
                                .catch(error => res.status(401).json({ error }));
                        });
                    }else{
                        Post.deleteOne({_id: req.params.id})
                            .then(() => { res.status(200).json({message: 'Post supprimée !'})})
                            .catch(error => res.status(401).json({ error }));
                    }
                }
            }
        })
        .catch( error => res.status(500).json({ error }));
};

//Fonction getOnePost qui va afficher à l'utilisateur une Post particulière qu'il a demandé dans sa requête GET
exports.getOnePost = (req, res, next) => { 
    Post.findOne({ _id: req.params.id })
        .then(Post => res.status(200).json(Post))
        .catch(error => res.status(404).json({ error }));
}

//Fonction getAllPost qui va afficher toutes les Posts disponibles dans la base de donnée
exports.getAllPosts =  (req, res, next) => {
    Post.find()
        .then(Post => res.status(200).json(Post))
        .catch(error => res.status(400).json({ error }));
}


//Fonction likePost qui permet de voir si l'utilisateur a déjà liké ou disliké et autorize, en fonction, l'ajout et la suppression de like/dislike
exports.likePost = (req, res, next) => {
    let originalPost = Post.findOne({_id: req.params.id})
    .then(originalPost =>{
        if(req.body.like === 1){
            if(originalPost.usersLiked.includes(req.auth.userId)){
                return res.status(409).json({ message: 'Vous avez déjà liké'})
            }else{
                Post.findOneAndUpdate({_id: req.params.id}, {$push:{usersLiked: req.auth.userId}, $inc:{likes:1} })
                    .then(() => res.status(200).json({ message: 'Like ajouté'}))
                    .catch(error => res.status(400).json({error }));  
            }
        }if(req.body.like === 0){
            if(originalPost.usersLiked.includes(req.auth.userId)){
                Post.findOneAndUpdate({_id: req.params.id}, {$pull:{usersLiked: req.auth.userId}, $inc:{likes:-1} })
                        .then(() => res.status(200).json({ message: 'Like retiré'}))
                        .catch(error => res.status(400).json({error }));  
            }else{
                return res.status(409).json({message: 'Il faut avoir liké pour revenir à 0'})
            }
        }
    })
    .catch(error => res.status(404).json({ error }));
    
}
