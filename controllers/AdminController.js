const Admin = require('../models/adminSchema')

const defaultResponseObject = {
  success: true,
  data: null, //{},[] or null
  message: "",
  error: null,
};

exports.authGateWay = async (req, res) => {
  try {
    console.log(req.body.mobileNumber)
    const admin = await Admin.findByCredentials(req.body.mobileNumber);
    
    let response = { ...defaultResponseObject };
    response.data = admin;
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
    const admin = await Admin.adminOtpVerify(req.body._id, req.body.otpVerify);
    const token = await Admin.generateAuthToken();

    let response = { ...defaultResponseObject };
    response.data = admin;

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
      const admin = await Admin.verifyPassword(req.body._id, req.body.password);
      const token = await Admin.generateAuthToken();
  
      let response = { ...defaultResponseObject };
      response.data = admin;
  
      response.token = token;
  
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
    const admin = await Admin.findByCredentials(
    //   req.body.email,
    //   req.body.password
    req.body.mobileNumber
    );
    const token = await Admin.generateAuthToken();
    res.send({ admin, token });
  } catch (e) {
    res.status(400).send();
  }
};

exports.logout = async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.admin.save();

    res.send('logout success!!');
  } catch (e) {
    res.status(500).send();
  }
};

const logoutAll = async (req, res) => {
  try {
    req.admin.tokens = [];
    await req.admin.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

// router.get('/admins/me', auth, async (req, res) => {
//     res.send(req.admin)
// })

 

// router.delete('/admins/me', auth, async (req, res) => {
//     try {
//         await req.admin.remove()
//         res.send(req.admin)
//     } catch (e) {
//         res.status(500).send()
//     }
// })
//################################
//vehicle apis@@@@@@