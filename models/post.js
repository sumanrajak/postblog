import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    },
    caption: {
        type: String,
        required: [true, 'caption is required!'],
    },
    tags:{
        type: String,
        required: [true, 'tag is required!'],
    },
    imageUrl:{
        type: String,
        required: [true, 'imageURL is required!'],
    },
    comments:{
        type: String,
    }
})

const Post = models.Post || model("Post", PostSchema);

export default Post;