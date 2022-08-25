const mongoose = require("mongoose");

//Model des posts
const postSchema = mongoose.Schema ({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageURL: {type: String, required: true},
    likes: {type: Number, required: false, default:0},
    dislikes: {type: Number, required: false, default:0},
    usersLiked: {type: [String], required: false},
    usersDisliked: {type: [String], required: false},
});

module.exports = mongoose.model('post.control', postSchema);
