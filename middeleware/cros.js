module.exports = (app) =>{
// Enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'OPTIONS, PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


}