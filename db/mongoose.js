const mongoose = require('mongoose')

// Connecting to the database
mongoose.connect('mongodb://127.0.0.1:27017/ezzy', {
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
   