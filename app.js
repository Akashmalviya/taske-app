const createError = require("http-errors");
const express = require("express");
const app = express();
const cors = require('cors');
const server = require("http").Server(app);
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

require("./db/mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "postapp" , 'dist' , 'postapp')));

//  require("./middeleware/cros")(app);

const allowedOrigins = [
 'http://localhost:4200'
  
]; // add orgin

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
    return
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  }
}

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));



/**
 * Swagger API Doc
 */


app.use("/", indexRouter);
app.use("/api/user",cors(corsOptions), usersRouter);


app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



module.exports = server;
