const mongoose = require("mongoose");

//Model des likes
const likeSchema = mongoose.Schema ({
    id: {type: [String], required: false},
    likes: {type: Number, required: false, default:0},
    dislikes: {type: Number, required: false, default:0},
    usersLiked: {type: [String], required: false},
    usersDisliked: {type: [String], required: false},
});

module.exports = mongoose.model('like.control', likeSchema);