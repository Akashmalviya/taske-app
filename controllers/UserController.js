const User = require("../models/userSchema");

const defaultResponseObject = {
  success: true,
  data: null, //{},[] or null
  message: "",
  error: null,
};

exports.signUp = async (req, res) => {
      const user = new User(req.body)
  try {
    await user.save()
     const token = await user.generateAuthToken()
    let response = { ...defaultResponseObject };
    response.data = user;
    res.status(201).send(response);
  } catch (e) {
    let response = { ...defaultResponseObject };
    response.error =  e.message || e;
    response.success = false;
    res.status(400).send(response);
  }
};

exports.login = async (req, res) => {
  try {
     const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    let response = { ...defaultResponseObject };
    response.data = user;

    response.token = token;

    return res.status(201).send(response);
  } catch (e) {
    let response = { ...defaultResponseObject };
    response.error = e.message || e;
    response.success = false;
    res.status(400).send(response);
  }
};

exports.myDetails = async (req, res) => {
    try {
           let response = { ...defaultResponseObject };
      response.data = req.user;
  
      return res.status(201).send(response);
    } catch (e) {
      let response = { ...defaultResponseObject };
      response.error = e.message || e;
      response.success = false;
      res.status(400).send(response);
    }
  };

 exports.completeProfile = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        throw new Error('Invalid updates!')

    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        let response = { ...defaultResponseObject };
      response.data = req.user;
  
      return res.status(201).send(response);
    } catch (e) {
        let response = { ...defaultResponseObject };
      response.error = e.message || e;
      response.success = false;
      res.status(400).send(response);
    }
}


exports.userList =  async (req, res) =>{
 
   try {
         let users=  await  User.find({role:'user'})
        let response = { ...defaultResponseObject };
      response.data = users;
  
      return res.status(201).send(response);
    } catch (e) {
        let response = { ...defaultResponseObject };
      response.error = e.message || e;
      response.success = false;
      res.status(400).send(response);
    }
}

exports.deleteMe = async (req, res) => {
    try {
        await req.user.remove()
        let response = { ...defaultResponseObject };
      response.data = req.user;
  
      return res.status(201).send(response);
    } catch (e) {
        let response = { ...defaultResponseObject };
      response.error = e.message || e;
      response.success = false;
      res.status(400).send(response);
    }
}

 


exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    let response = { ...defaultResponseObject };
      response.data = req.user;
        return res.status(201).send(response);
    } catch (e) {
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(400).send(response);
    }
};
exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

