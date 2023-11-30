import express from 'express';
import { createPost, testPostApi,getAllPosts, updatePostById, getPostById, deletePostById, createCommentsInPost, getAllCommentsForPost, updateCommentsInPosts, deleteCommentsInPosts } from '../controllers/postController.js';

const router = express.Router();


router.get('/test', testPostApi);

// Post Api
router.get("/",getAllPosts);
router.post("/",createPost);
router.get("/:id",getPostById);
router.put("/:id",updatePostById);
router.delete("/:id",deletePostById);

// comments
router.post("/:id/comments",createCommentsInPost);
router.get("/:id/comments",getAllCommentsForPost);
router.put("/:id/comments/:commentId",updateCommentsInPosts);
router.delete("/:id/comments/:commentId",deleteCommentsInPosts);



export default router;