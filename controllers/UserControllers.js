const User = require("../models/userSchema");

const defaultResponseObject = {
  success: true,
  data: null, //{},[] or null
  message: "",
  error: null,
};

exports.authGateWay = async (req, res) => {
  try {
    //console.log(req.body.mobileNumber)
    const user = await User.findByCredentials(req.body.mobileNumber);
    
    let response = { ...defaultResponseObject };
    response.data = user;
    res.status(201).send(response);
  } catch (e) {
    let response = { ...defaultResponseObject };
    response.error = e;
    response.success = false;
    res.status(400).send(response);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const user = await User.userOtpVerify(req.body._id, req.body.otpVerify);
    const token = await user.generateAuthToken();

    let response = { ...defaultResponseObject };
    response.data = user;

    response.token = token;

    return res.status(201).send(response);
  } catch (e) {
    let response = { ...defaultResponseObject };
    response.error = e;
    response.success = false;
    res.status(400).send(response);
  }
};

exports.verifyPassword = async (req, res) => {
    try {
      const user = await User.verifyPassword(req.body._id, req.body.password);
      const token = await user.generateAuthToken();
  
      let response = { ...defaultResponseObject };
      response.data = user;
  
      response.token = token;
  
      return res.status(201).send(response);
    } catch (e) {
      let response = { ...defaultResponseObject };
      response.error = e;
      response.success = false;
      res.status(400).send(response);
    }
  };

exports.completeProfile = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["firstName", "lastName", "email", "password"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
  
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
  
    try {
      updates.forEach((update) => (req.user[update] = req.body[update]));
      req.user.profileCompleted = true;
      await req.user.save();
      let response = { ...defaultResponseObject };
      response.data = req.user;
        return res.status(201).send(response);
    } catch (e) {
        let response = { ...defaultResponseObject };
        response.error = e;
        response.success = false;
        res.status(400).send(response);
    }
  };

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

// router.get('/users/me', auth, async (req, res) => {
//     res.send(req.user)
// })

 

// router.delete('/users/me', auth, async (req, res) => {
//     try {
//         await req.user.remove()
//         res.send(req.user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })
