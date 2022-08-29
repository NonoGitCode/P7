const mongoose = require('mongoose');
const MongooseErrors = require('mongoose-errors')


//Modèle des informations requise pour ajouter un post à la bdd
const postSchema = mongoose.Schema({
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  pseudo: { type: String, required: true},
  userId: { type: String, required: true },
  likes: { type: Number, required: true },
  usersLiked: { type: [String] },
  createTime: {type: Number, required: true},
  updateTime: {type: Number, required: true}
});

postSchema.plugin(MongooseErrors);


module.exports = mongoose.model('Post', postSchema);

