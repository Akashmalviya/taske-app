const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
  
})

// userSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })

const AdminSchema = mongoose.model('Admin', adminSchema)

module.exports = AdminSchema