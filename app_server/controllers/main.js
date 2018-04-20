var request = require('request');
var rp = require('request-promise-native');
var moment = require('moment');

const { Client } = require('pg');
var client = new Client({
	user:'xabbxqtkxgcvih',
	password:'b8a675e2792642149758575fd86feefea915cd90c16f6bc5fabada73401225d9',
	database:'dddbmmvms4r405',
	port:'5432',
	host:'ec2-54-221-192-231.compute-1.amazonaws.com',
	ssl: true,
});

client.connect();

/*GET home page*/
module.exports.index = function(req,res){
	//res.render('index',{err:"something went terribly wrong!"});
	res.render('index',{ title: 'Employee Recognition HOME PAGE'});
};

module.exports.login=function(req,res){
	res.render('login');
};


module.exports.adminLogin=function(req,res){
	res.render('adminLogin');
};

module.exports.postLogin=function(req,res,next){
	const login=req.body;
	/*to protect password, simply check if validated*/
	client.query('SELECT id,username, password =($2) as validated FROM employee where username=($1);',[login.name, login.pass], function(err,result){
		if(err){
			return next(err);
		}
		if(result.rows[0] && result.rows[0].validated){
			req.session.userId=result.rows[0].id;
			req.session.email=result.rows[0].username;
			req.session.userType='E';
			res.render('mainMenu',{ name: req.session.email });
		} else{
			res.render('login',{err:"Invalid credentials"});
		}
	});
};

module.exports.postLoginAdmin=function(req,res,next){
	const login=req.body;

	client.query('SELECT id, email, password =($2) as validated FROM admin where email=($1);',[login.name, login.pass], function(err,result){
		if(err){
			return next(err);
		}
		if(result.rows[0] && result.rows[0].validated){
			req.session.userId=result.rows[0].id;
			req.session.email=result.rows[0].email;
			req.session.userType='A';
			res.redirect('mainMenuAdmin');
		} else{
			res.render('adminLogin',{err:"Invalid credentials"});
		}
	});
};

module.exports.mainMenu=function(req,res){
	if(req.session.userId && req.session.userType =='E'){
		res.render('mainMenu',{name:req.session.userName});
	}
	else{
	res.render('login',{err:"You must log in as an Employee to access!"});
	}
};

module.exports.mainMenuAdmin=function(req,res){
	if(req.session.userId && req.session.userType =='A'){
		res.render('mainMenuAdmin',{name:req.session.userName});
	}
	else{
		res.render('adminLogin',{err:"You must log in as an Admin to access"});
	}
};
