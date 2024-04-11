import { Schema, model, models } from "mongoose";
const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

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
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Comment = models.Comment || model("Comment", CommentSchema);

const Post = models.Post || model("Post", PostSchema);

export default Post;
// export default Comment;
