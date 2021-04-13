var express = require('express');

const UserControllers = require('../controllers/UserController') 
const PostControllers = require('../controllers/PostController') 
const auth = require('../middeleware/auth') 


var router = express.Router();

/* GET users listing. */
router.post('/login', UserControllers.login);
router.post('/signUp', UserControllers.signUp);
router.post('/createPost', auth.authUser,  PostControllers.createPost);
router.get('/myPostList', auth.authUser,  PostControllers.getUserPostnew);
router.get('/userList', auth.authAdmin,  UserControllers.userList);
router.get('/userPost/:id', auth.authAdmin,  PostControllers.getUserPost);

// router.post('/verifyOtp', UserControllers.verifyOtp);
// router.post('/verifyPassword', UserControllers.verifyPassword);
// router.put('/completeProfile',auth, UserControllers.completeProfile);
 router.get('/logout',auth.authUser, UserControllers.logout)
 router.get('/logoutAdmin',auth.authAdmin, UserControllers.logout)

module.exports = router;


