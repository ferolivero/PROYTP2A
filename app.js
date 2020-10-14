let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let inventorsRouter = require('./routes/inventors');
let virusRouter = require('./routes/virus');
const expressJwt = require('express-jwt');
const { Buffer } = require('buffer');

/** Clave de firma de los JWT plana */
// const secretKey = 'Grupo2-SecretKey'
/** Clave de firma de los JWT hasheada */
const secretKey = Buffer.from('Grupo2-SecretKey', 'base64')

let app = express();

/** Opcion para todos los endpoint con excepcion el que genera el token */
// app.use(
//   expressJwt(
//     { 
//       secret: secretKey,
//       algorithms: ['sha1', 'RS256', 'HS256'],
//     }
//   ).unless({path: ['/token']})
// );

/** Opcion para todos los metodos con excepcion de los GET */
app.use(
  expressJwt(
    { 
      secret: secretKey,
      algorithms: ['sha1', 'RS256', 'HS256'],
    }
  ).unless({ method: 'GET' })
);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/inventors',inventorsRouter);
app.use('/api/virus', virusRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
