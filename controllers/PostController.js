const Post = require("../models/postSchema")


const defaultResponseObject = {
  success: true,
  data: null, //{},[] or null
  message: "",
  error: null,
};

exports.createPost =  async (req, res) => {
    const post = new Post({
        ...req.body,
        owner: req.user._id
    })

    try {
        await post.save()
         let response = { ...defaultResponseObject };
    response.data = post;
        res.status(201).send(response)
    } catch (e) {
        let response = { ...defaultResponseObject };
      response.error = e.message || e;
      response.success = false;
      res.status(400).send(response);
    }
}


exports.getUserPostnew =  async (req, res) => {
  
    try {
        console.log('hbhjbh');
        await req.user.populate('posts').execPopulate()
         let response = { ...defaultResponseObject };
         
    response.data = req.user.posts;
        res.status(202).send(response)
    } catch (e) {
        console.log(e);
        let response = { ...defaultResponseObject };
      response.error = e.message || e;
      response.success = false;
      res.status(400).send(response);
    }
}

exports.getUserPost =  async (req, res) => {
    const _id = req.params.id
    try {
        
         const posts = await Post.find({ owner:_id })
    
         let response = { ...defaultResponseObject };
    response.data =posts;
        res.status(201).send(response)
    } catch (e) {
        let response = { ...defaultResponseObject };
      response.error = e.message || e;
      response.success = false;
      res.status(400).send(response);
    }
}


exports.getPostById =  async (req, res) => {
    const _id = req.params.id

  
    try {
        const post = await Post.findOne({ _id, owner: req.user._id })
 if (!post) {
            throw new Error('Post not Found')
        }
         let response = { ...defaultResponseObject };
    response.data =post;
        res.status(201).send(response)
    } catch (e) {
        let response = { ...defaultResponseObject };
      response.error = e.message || e;
      response.success = false;
      res.status(400).send(response);
    }
}


exports.updatePost =async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        throw new Error('Invalid updates!')
    }

    try {
        const post = await Post.findOne({ _id: req.params.id, owner: req.user._id})

        if (!post) {
            throw new Error('Post Not Found')
        }

        updates.forEach((update) => post[update] = req.body[update])
        await post.save()
         let response = { ...defaultResponseObject };
    response.data =post;
        res.status(201).send(response)
    } catch (e) {
       let response = { ...defaultResponseObject };
      response.error = e.message || e;
      response.success = false;
      res.status(400).send(response);
    }
}

exports.delete = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!post) {
            throw new Error('Post Not Found')
        }

       let response = { ...defaultResponseObject };
    response.data =post;
        res.status(201).send(response)
    } catch (e) {
        let response = { ...defaultResponseObject };
      response.error = e.message || e;
      response.success = false;
      res.status(400).send(response);
    }
}