const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
  
})

// userSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })

const AdminSchema = mongoose.model('Admin', adminSchema)


adminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign({ _id: admin._id.toString() , role :'admin' }, "thisismynewcourse");

  admin.tokens = admin.tokens.concat({ token });
  await admin.save();

  return token;
};


module.exports = AdminSchema