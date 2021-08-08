import express from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost, likePost, getRelevent } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/fuck', getPosts );             //`/posts?page=${page}`
router.get('/:id', getPost);
router.get('/', getRelevent );    //`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`

router.post('/', auth, createPost );
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;