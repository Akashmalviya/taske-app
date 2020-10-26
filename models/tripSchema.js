const mongoose = require('mongoose')


const tripSchema = new mongoose.Schema({
  
})

// userSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })

const TripSchema = mongoose.model('Trip', tripSchema)

module.exports = TripSchema