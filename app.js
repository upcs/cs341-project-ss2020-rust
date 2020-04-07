var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var acc_updateRouter = require('./routes/updateaccount');
var initacctRouter = require('./routes/initacct');
var passwordRouter = require('./routes/changePassword');
var dataRouter = require('./routes/retrieve');
var InfoRouter = require('./routes/retrieveInfo');
var favoriteRouter = require('./routes/retrieveFavorite');
var changeFavRouter = require('./routes/changeFavorites');
var reviewRouter = require('./routes/addReview'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/updateaccount', acc_updateRouter);
app.use('/initacct', initacctRouter);
app.use('/changePassword', passwordRouter);
app.use('/retrieve', dataRouter);
app.use('/retrieveInfo', InfoRouter);
app.use('/retrieveFavorite', favoriteRouter);
app.use('/changeFavorites', changeFavRouter);
app.use('/addReview', reviewRouter); 


//redirect 404 error to the 404.html page
//source: https://www.semicolonworld.com/question/44879/how-to-redirect-404-errors-to-a-page-in-expressjs
app.get('*', function(req, res){
  if (req.accepts('html')) {
     res.send('404', '<script>location.href = "/404.html";</script>');
     return;
  }
});

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
  //next(createError(404));
//});

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
