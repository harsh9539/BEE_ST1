import Post from "../models/postModel.js";

export const testPostApi = (req, res) => {
    res.status(200).json({
        message: "User Api Working successfully",
    });
};

export const createPost = async (req, res) => {
    const { title, content, author, tags } = req.body;
    const post = new Post({
        title,
        content,
        author,
        tags,
    });
    try {
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const updatePostById = async (req, res) => {
    const { id } = req.params;
    const { title, content, author, tags } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content, author, tags },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deletePostById = async (req, res) => {
    const { id } = req.params;
    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: "Post Deleted Successfully" });
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
};

export const createCommentsInPost = async (req, res) => {
    const { id } = req.params;
    const { content, author } = req.body;
    const obj = {
        id: new Date().toISOString() +  Math.random().toString(),
        content,
        author,
    }
    try {
        const post = await Post.findById(id);
        post.comments.push(obj);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const getAllCommentsForPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        res.status(200).json(post.comments);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const updateCommentsInPosts = async (req, res) => {
    const { id, commentId } = req.params;
    const { content, author } = req.body;
    try {
        const post = await Post.findById(id);
        const comment = post.comments.id(commentId);
        comment.content = content;
        comment.author = author;
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteCommentsInPosts = async (req, res) => {
    const { id, commentId } = req.params;
    try {
        const post = await Post.findById(id);
        post.comments.id(commentId).remove();
        await post.save();
        res.status(200).json({ message: "Comment Deleted Successfully" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}