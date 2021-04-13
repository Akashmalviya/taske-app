const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    post_title : {
        required:true,
        type:String
    },
    postBody : {
        required:true,
        type:String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps:true
})


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
