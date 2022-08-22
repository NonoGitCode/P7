const Post = require('../models/Post');
const fs = require('fs');


//Fonction create Post qui va récuperer les informations dans le body de la requête selon le schema, elle va y ajouter l'URL de l'image généré ainsi que l'initialisation des likes et dislike
exports.createPost = (req, res, next) => {
    const PostObject = JSON.parse(req.body.Post);
    delete PostObject._id;
    const Post = new Post({
        ...PostObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        createTime: Date.now(),
        updateTime: Date.now(),
    });
    Post.save()
        .then(() => { res.status(201).json({message: 'Post enregistrée !'})})
        .catch(error => { res.status(400).json( { error })})
};


//Fonction modify Post qui récupère les informations transmises dans le body et qui met à jour ce qui a été modifié (après avoir vérifié si l'utilisateur est bien le créateur de l'objet Post en premier lieu)
exports.modifyPost = (req, res, next) => { 
    const PostObject = req.file ? {
        ...JSON.parse(req.body.Post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        modifyTime: Date.now()
    } : { ...req.body };
    delete PostObject._userId;
    Post.findOne({_id: req.params.id})
        .then((Post)=> {
            if(level >= 1){
                Post.updateOne({ _id: req.params.id}, {...PostObject, _id: req.params.id,})
                .then(() => res.status(200).json({ message: 'Post modififée !'}))
                .catch((error)=> res.status(400).json({ error }));
            }else{
                if(Post.userId != req.auth.userId){
                    return res.status(403).json({ message: 'unauthorized request'});
                }else{
                    Post.updateOne({ _id: req.params.id}, {...PostObject, _id: req.params.id})
                        .then(() => res.status(200).json({ message: 'Post modififée !'}))
                        .catch((error)=> res.status(400).json({ error }));
                }
            }
        })
        .catch((error)=> res.status(500).json({ error }));

};

//fonction deletePost qui permet de suprimmer une Post de la base de donnée si la requête vient bien de l'utilisateur qui a créé cette Post
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
        .then(Post => {
            if(level >= 1){
                const filename = Post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Post supprimée !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }else{
                if (Post.userId != req.auth.userId) {
                    res.status(403).json({message: 'Not authorized'});
                } else {
                    const filename = Post.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Post.deleteOne({_id: req.params.id})
                            .then(() => { res.status(200).json({message: 'Post supprimée !'})})
                            .catch(error => res.status(401).json({ error }));
                    });
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
    Post.findOne({ _id: req.params.id })
        .then(Post => {
            if (req.body.like === 1){
                if(Post.usersLiked.includes(req.body.userId)){
                    return res.status(409).json({ message: 'Vous avez déjà liké'})
                }
                if(!Post.usersLiked.includes(req.body.userId) && !Post.usersDisliked.includes(req.body.userId) )
                    Post.updateOne({ _id: req.params.id }, {$inc: {likes:1}, $push: {usersLiked: req.body.userId}})
                        .then(() => res.status(200).json({ message: 'Like ajouté'}))
                        .catch(error => res.status(400).json({ error }));
                }
            if (req.body.like === 0){
                if(Post.usersLiked.includes(req.body.userId)){
                    Post.updateOne({ _id: req.params.id }, {$inc: {likes:-1}, $pull: {usersLiked: req.body.userId}})
                        .then(() => res.status(200).json({ message: 'like retiré'}))
                        .catch(error => res.status(400).json({ error }));
                }
                if(!Post.usersLiked.includes(req.body.userId) && !Post.usersDisliked.includes(req.body.userId)){
                    return res.status(409).json({message: 'Il faut avoir liké pour revenir à 0'})
                }
            }
        })
        .catch(error => res.status(404).json({ error }));
}