const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser')



// Import Routes
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const authRoute = require('./routes/auth');
const usersRouter = require('./routes/users');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// Use Routes
app.use('/api/users', usersRouter);
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/auth', authRoute);



app.use(cors({
  origin: true,
  credentials:true,
  allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept',
  methods: 'GET, POST, PATCH, DELETE, PUT'

}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
