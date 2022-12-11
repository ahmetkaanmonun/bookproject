import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  subtitle: String,
  category: String,
  publisher: String,
  language: String,
  situation: String,
  image: String,
  price: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
