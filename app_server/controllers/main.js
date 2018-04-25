var request = require('request');
var rp = require('request-promise-native');
var moment = require('moment');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'lynx.no.reploy@gmail.com',
        pass: 'admini_strator_2018'
    }
});

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

function followMail(e_mail,s_ubject,url){


	url="https://pacific-thicket-81385.herokuapp.com"+url;
 	
	const mailOptions = {
	from: 'lynx.no.reply@gmail.com', // sender address
	to: e_mail, // list of receivers
 	subject: s_ubject, // Subject line
 	text: url // plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});
}
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
		res.render('mainMenuAdmin',{name:req.session.email});
	}
	else{
		res.render('adminLogin',{err:"You must log in as an Admin to access"});
	}
};

module.exports.addEmployee=function(req,res){
	if(req.session.userId && req.session.userType =='A'){
		res.render('addEmployee');
	}
	else{
	res.render('adminLogin',{err:"You must log in as an Admin to access!"});
	}
};

module.exports.addAdmin=function(req,res){
	if(req.session.userId && req.session.userType =='A'){
		res.render('addAdmin');
	}
	else{
		res.render('adminLogin',{err:"You must log in as an Admin to access"});
	}
};

//postNewEmployee
module.exports.postNewEmployee=function(req,res,next){
	if(req.session.userId && req.session.userType =='A'){
		const data=req.body;
		//console.log(data)
		client.query('INSERT INTO employee(username, password, admin_id) VALUES ($1,$2,$3);',
			[data.email, data.pass, req.session.userId], function(err,result){
		if(err){
			return next(err);
		}
		//res.send(200);
		followMail(data.email,"Activation Account","/mainMenu");
		res.render('mainMenuAdmin',{name:req.session.email});
		});
	} else{
			res.render('adminLogin',{err:"Invalid credentials"});
	}
};

//postNewAdmin
module.exports.postNewAdmin=function(req,res,next){
	if(req.session.userId && req.session.userType =='A'){
		const data=req.body;
		console.log(data);

		client.query('INSERT INTO admin(email, password, admin_id) VALUES ($1,$2,$3);',
			[data.email, data.pass, req.session.userId], function(err,result){
		if(err){
			return next(err);
		}
		//res.send(200);
		followMail(data.email,"Activation Account","/mainMenuAdmin");
		res.render('mainMenuAdmin',{name:req.session.email});
		});
	} else{
			res.render('adminLogin',{err:"Invalid credentials"});
	}
};

