const DriverSchema = require("../models/driverSchema");


const defaultResponseObject = {
  success: true,
  data: null, //{},[] or null
  message: "",
  error: null,
};

exports.authGateWay = async (req, res) => {
  try {
    //console.log(req.body.mobileNumber)
    let driver = await DriverSchema.findByCredentials(req.body.mobileNumber);
    console.log(driver);
    driver.location = req.body.location
   driver = await driver.save()

    driver = await DriverSchema.aggregate([{
                            $geoNear: {
                                "near": {
                                    type: "Point",
                                    coordinates: [parseFloat(22.9734229), parseFloat(78.6568942)]
                                },
                                "maxDistance": 9 * 1000,
                                "query": {
                                    // activeStatus: "1",
                                    // driverStatus: "1",

                                },
                                "distanceField": "distance",
                                "includeLocs": "dist.location",
                                "spherical": true
                            },
                        },
                       
                    ]).sort({
                        distance: 1
                    }).limit(1);
    
    let response = { ...defaultResponseObject };
    response.data = driver;
    res.status(201).send(response);
  } catch (e) {
    console.log(e);
    let response = { ...defaultResponseObject };
    response.error = e;
    response.success = false;
    res.status(400).send(response);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const driver = await DriverSchema.userOtpVerify(req.body._id, req.body.otpVerify);
    const token = await driver.generateAuthToken();

    let response = { ...defaultResponseObject };
    response.data = driver;

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

    res.send('logout success!!');
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









exports.documentUpload  = async (req, res) =>{

  console.log(req.file.path);
  var img = req.file.path
  const url = 'http://localhost:3000/'+img
    res.send('file uploaded succesfully'+ url)
}


// router.post('/uploads', upload.array('uploads'), async(req,res) => {
//     res.send('200')
// })

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
