import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:true
    },
    comments:[
        {
            id:{
                type:String,
                required:true,
            },
            content:{
                type:String,
                required:true,
            },
            author:{
                type:String,
                required:true,
            },
            createdAt:{
                type:Date,
                default:new Date(),
            }
        }
    ],
},
{
    timestamps: true,
}
);

const Post = mongoose.model("Post", postSchema);
export default Post;