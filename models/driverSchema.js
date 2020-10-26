const mongoose = require('mongoose')


const driverSchema = new mongoose.Schema({
  
})

// userSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })

const DriverSchema = mongoose.model('Driver', driverSchema)

module.exports = DriverSchema