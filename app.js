var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var pug = require('pug');


//route 
var index = require('./app_server/routes/index');
var faq = require('./app_server/routes/faq');
var contact = require('./app_server/routes/contact');
var postContact = require('./app_server/routes/postContact');
var login = require('./app_server/routes/login');
var logout = require('./app_server/routes/logout');
var postLogin = require('./app_server/routes/postLogin');
var adminLogin = require('./app_server/routes/adminLogin');
var postLoginAdmin = require('./app_server/routes/postLoginAdmin');
var mainMenu = require('./app_server/routes/mainMenu');
var mainMenuAdmin = require('./app_server/routes/mainMenuAdmin');
var addAdmin = require('./app_server/routes/addAdmin');
var addAward = require('./app_server/routes/addAward');
var addEmployee = require('./app_server/routes/addEmployee');
var postNewEmployee = require('./app_server/routes/postNewEmployee');
var postNewAdmin = require('./app_server/routes/postNewAdmin');
var postNewAward = require('./app_server/routes/postNewAward');
var newPassEmployee = require('./app_server/routes/newPassEmployee');
var postPassEmployee = require('./app_server/routes/postPassEmployee');
var addSignature = require('./app_server/routes/addSignature');
var postSignature = require('./app_server/routes/postSignature');
var accountDetail = require('./app_server/routes/accountDetail');
var awards = require('./app_server/routes/awards');
var deleteEmployee = require('./app_server/routes/deleteEmployee');
var employees = require('./app_server/routes/employees');
var admins = require('./app_server/routes/admins');
var deleteAdmins = require('./app_server/routes/deleteAdmins');
var deleteAward = require('./app_server/routes/deleteAward');
var editEmployee = require('./app_server/routes/editEmployee');
var editAdmins = require('./app_server/routes/editAdmins');
var numAwards = require('./app_server/routes/numAwards');

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'app_server/public')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// session cookie
app.use(session({ secret: 'keyboard car', cookie: { maxAge: 900000 } }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/faq', faq);
app.use('/login', login);
app.use('/logout', logout);
app.use('/contact', contact);
app.use('/postContact', postContact);
app.use('/adminLogin', adminLogin);
app.use('/postLogin', postLogin);
app.use('/postLoginAdmin', postLoginAdmin);
app.use('/mainMenu', mainMenu);
app.use('/mainMenuAdmin', mainMenuAdmin);
app.use('/addAdmin', addAdmin);
app.use('/addAward', addAward);
app.use('/addEmployee', addEmployee);
app.use('/postNewEmployee', postNewEmployee);
app.use('/postNewAdmin', postNewAdmin);
app.use('/postNewAward', postNewAward);
app.use('/newPassEmployee', newPassEmployee);
app.use('/postPassEmployee', postPassEmployee);
app.use('/addSignature', addSignature);
app.use('/postSignature', postSignature);
app.use('/accountDetail', accountDetail);
app.use('/awards', awards);
app.use('/employees', employees);
app.use('/deleteEmployee', deleteEmployee);
app.use('/deleteAdmins', deleteAdmins);
app.use('/admins', admins);
app.use('/deleteAward', deleteAward);
app.use('/editEmployee', editEmployee);
app.use('/editAdmins', editAdmins);
app.use('/numAwards', numAwards);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

app.listen(8080, function() {
    console.log("Server running");
});
