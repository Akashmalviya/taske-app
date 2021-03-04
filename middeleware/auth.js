const jwt = require('jsonwebtoken')
const AdminSchema = require('../models/adminSchema')
const DriverSchema = require('../models/driverSchema')
const User = require('../models/userSchema')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')

        var user
        if(decoded.role === 'user'){
         user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
         console.log(user);
        }
         if(decoded.role === 'driver'){
         user = await DriverSchema.findOne({ _id: decoded._id, 'tokens.token': token })
        }
        if(decoded.role === 'admin'){
         user = await AdminSchema.findOne({ _id: decoded._id, 'tokens.token': token })
        }

        if (!user) {
            throw new Error()
        }
      
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth