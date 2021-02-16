const mongoose = require('mongoose')

const data = 'mongodb://127.0.0.1:27017'
// Connecting to the database
mongoose.connect(data, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
   console.log("Successfully connected to the database");    
}).catch(err => {
   console.log('Could not connect to the database. Exiting now...', err);
   process.exit();
});
mongoose.set('useFindAndModify', false );
//mongodb+srv://admin:vizikAPN@ezzey.wpbj6.mongodb.net/Ezzey?retryWrites=true&w=majority