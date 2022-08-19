const mongoose = require("mongoose");
const likemodel = require("./likemodel");

//Model des posts
const postSchema = mongoose.Schema ({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: String, required: true},
});

module.exports = mongoose.model('post', postSchema);
