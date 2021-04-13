const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')

exports.authUser  = async (req, res, next) => {
    try {
        
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
       

        var user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
       
       
        if (!user) {
            throw new Error()
        }
         if (user.role !== 'user') {
            throw new Error()
        }
      
        req.token = token
        req.user = user
        next()
    } catch (e) {
        console.log(e);
        res.status(401).send({ error: 'Please authenticate.' })
    }
}
exports.authAdmin  = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')

        var user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
       
        if (!user) {
            throw new Error()
        }
         if (user.role !== 'admin') {
            throw new Error()
        }
      
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}
