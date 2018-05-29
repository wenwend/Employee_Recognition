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

function followMail(e_mail,s_ubject,url,content=''){
	
	url="https://pacific-thicket-81385.herokuapp.com"+url;
 	
	const mailOptions = {
	from: 'lynx.no.reploy@gmail.com', // sender address
	to: e_mail, // list of receivers
 	subject: s_ubject, // Subject line
 	html: url+'<br>'+ content
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

module.exports.faq = function(req,res){
	//res.render('index',{err:"something went terribly wrong!"});
	res.render('faq',{ title: 'FAQ Page'});
};

//logout
module.exports.logout=function(req,res,next){
	if(req.session)
		req.session.destroy(function(err){
			if(err)
				return next(err);
			else
				res.redirect('/');
	})
};

module.exports.login=function(req,res){
	res.render('login');
};

module.exports.contact=function(req,res){
	res.render('contact');
};
module.exports.postContact = function(req,res){
	const mail =req.body;
	var content = 'From:' + mail.email +'Content:'+mail.content; 
	followMail("lynx.no.reploy@gmail.com",mail.subject,'',content);
	res.render('index',{ title: 'Home Page'});
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
			res.render('adminLogin',{err:"Admin: Invalid credentials"});
		}
	});
};

module.exports.mainMenu=function(req,res){
	if(req.session.userId && req.session.userType =='E'){
		res.render('mainMenu',{name:req.session.email});
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
//addAward
module.exports.addAward=function(req,res){
	if(req.session.userId && req.session.userType =='E'){
		res.render('addAward',{ name:req.session.email });
	}
	else{
	res.render('login',{err:"You must log in as an Employee to access!"});
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

//postNewAdmin
module.exports.postNewAward=function(req,res,next){
	console.log(req.body);
	if(req.session.userId && req.session.userType =='E'){
		const data=req.body;
		console.log(data);

		client.query('INSERT INTO award(type, given_fname, given_lname, given_email, e_id, given_date,given_time) VALUES ($1,$2,$3,$4,$5,$6,$7);',
			[data.type, data.fname, data.lname, data.email, req.session.userId, data.date, data.time], function(err,result){
		if(err){
			return next(err);
		}
		//res.send(200);
		followMail(data.email,"You got a reward!","/mainMenuAdmin");
		res.render('mainMenu',{name:req.session.email});
		});
	} else{
			res.render('login',{err:"Invalid credentials"});
	}
};

//newPassEmployee
module.exports.newPassEmployee=function(req,res){
	if(req.session.userId && req.session.userType =='E'){
		res.render('newPassEmployee',{name:req.session.email});
	}
	else{
	res.render('login',{err:"You must log in as an Employee to access!"});
	}
};

//postPassEmployee
module.exports.postPassEmployee=function(req,res,next){
	
	if(req.session.userId && req.session.userType =='E'){
		const data=req.body;
		console.log(data);

		client.query("UPDATE employee SET password = ($1) WHERE id = ($2);",
			[data.pass1, req.session.userId], function(err,result){
		if(err){
			return next(err);
		}
		//res.send(200);
		followMail(req.session.email, "You Changed your password!","/mainMenu");
		res.render('mainMenu',{ name:req.session.email });
		});
	} else{
		res.render('login', {err:"Invalid credentials"});
	}
};

//addSignature
module.exports.addSignature=function(req,res){
	if(req.session.userId && req.session.userType =='E'){
		res.render('addSignature',{name:req.session.email});
	}
	else{
	res.render('login',{err:"You must log in as an Employee to access!"});
	}
};

//postSignature
module.exports.postSignature=function(req,res,next){
	
	if(req.session.userId && req.session.userType =='E'){
		const data=req.body;
		console.log(data.filename);
		
		client.query("UPDATE signature SET data =($1) WHERE e_id = ($2);",
			[data.filename, req.session.userId], function(err,result){
		if(err){
			return next(err);
		}
		//res.send(200);
		//followMail(req.session.email, "You Changed your password!","/mainMenu");
		//console.log(data.filename);
		res.render('mainMenu',{ name:req.session.email });
		});
	}else{
		res.render('login', {err:"Invalid credentials"});
	}
};

//accountDetail
module.exports.accountDetail = function(req, res, next) {
    if (req.session.userId && req.session.userType == "E") {
        client.query('SELECT * FROM employee inner join signature on signature.e_id = employee.id WHERE employee.id=($1);', [req.session.userId], function(err, result) {
            if (err) {
                return next(err);
            }
            console.log(result.rows[0]);
            var data ={
            	email:result.rows[0].username,
            	first:result.rows[0].first_name,
            	last:result.rows[0].last_name,
            	sign:result.rows[0].data,
            };
            res.render('accountDetail',{data});
        });
    } else {
        res.render('login', { err: "Invalid credentials" });
    }
};
//awards
module.exports.awards = function(req, res, next) {
    if (req.session.userId && req.session.userType == "E") {
        client.query('SELECT award.id, award.given_email, award.given_date,award_type.name FROM award inner join employee on award.e_id = employee.id inner join award_type on award_type.id = award.type WHERE employee.id=($1);', [req.session.userId], function(err, result) {
            if (err) {
                return next(err);
            }
            console.log(result.rows);
            var awards=[];
            for(var i =0;i<result.rows.length;i++){
            	var prettyDate = result.rows[i].given_date.toString().split("00:")[0];
            	awards[i] ={
            		type:result.rows[i].name,
            		receiver:result.rows[i].given_email,
            		date:result.rows[i].given_date,
            		sender:req.session.email,
            		id:result.rows[i].id,
            	};
      		}
            res.render('awards',{awards});
        });
    } else {
        res.render('login', { err: "Invalid credentials" });
    }
};
//deleteAward
module.exports.deleteAward = function(req, res, next) {
    if (req.session.userId && req.session.userType == "E" && req.query.id ) {
        client.query('DELETE FROM award where id = $1;',[req.query.id], function(err, result) {
            if (err) {
                return next(err);
            }
            //res.send(200);
            res.render('mainMenu',{name:req.session.email});
        });
    } else {
        res.render('lgoin', { err: "Invalid credentials" });
    }
};

//employees
module.exports.employees = function(req, res, next) {
    if (req.session.userId && req.session.userType == "A") {
        client.query('SELECT * FROM employee where id NOT IN ($1);',[req.session.userId], function(err, result) {
            if (err) {
                return next(err);
            }
            console.log("gettting results");
            var employees=[];
            for(var i =0;i<result.rows.length;i++){
            	var prettyDate = result.rows[i].create_date.toString().split("00:")[0];
            	employees[i] ={
            		first:result.rows[i].first_name,
            		last:result.rows[i].last_name,
            		email:result.rows[i].username,
            		date:result.rows[i].create_date,
            		id:result.rows[i].id,
            	};
      		}
            res.render('employees',{employees});
        });   
    } else {
        res.render('adminLogin', { err: "Invalid credentials" });
    }
};

module.exports.editEmployee = function(req, res, next) {
	console.log(req.body);
	res.render('mainMenuAdmin',{name:req.session.email});
    if (req.session.userId && req.session.userType == "A" && req.body.id) {
    	const data=req.body;
        client.query('UPDATE employee SET first_name = $2,last_name= $3, username = $4 WHERE id = $1;',[data.id, data.fname,data.lname,data.uname], function(err, result) {
            if (err) {
                return next(err);
            }
            //return res.send(200);
            //res.render('mainMenuAdmin',{name:req.session.email});
        });
    } else {
        res.render('adminLogin', { err: "Invalid credentials" });
    }
};
//deleteEmployee
module.exports.deleteEmployee = function(req, res, next) {
    if (req.session.userId && req.session.userType == "A" && req.query.id ) {
        client.query('DELETE FROM employee where id = $1;',[req.query.id], function(err, result) {
            if (err) {
                return next(err);
            }
            //res.send(200);
            res.render('mainMenuAdmin',{name:req.session.email});
        });
    } else {
        res.render('adminLogin', { err: "Invalid credentials" });
    }
};
//admins
module.exports.admins = function(req, res, next) {
    if (req.session.userId && req.session.userType == "A") {
        client.query('SELECT * FROM admin where id NOT IN ($1);',[req.session.userId], function(err, result) {
            if (err) {
                return next(err);
            }
            console.log(result.rows);
            var admins=[];
            for(var i =0;i<result.rows.length;i++){
            	admins[i] ={
            		email:result.rows[i].email,
            		id:result.rows[i].id,
            	};
      		}
            res.render('admins',{admins});
        });
    } else {
        res.render('adminLogin', { err: "Invalid credentials" });
    }
};

//deleteAdmins
module.exports.deleteAdmins = function(req, res, next) {
    if (req.session.userId && req.session.userType == "A" && req.query.id ) {
        client.query('DELETE FROM admin where id = $1;',[req.query.id], function(err, result) {
            if (err) {
                return next(err);
            }
            //res.send(200);
            res.render('mainMenuAdmin',{name:req.session.email});
        });
    } else {
        res.render('adminLogin', { err: "Invalid credentials" });
    }
};

//updateEmployee
module.exports.updateEmployee = function(req, res, next) {
    if (req.session.userId && req.session.userType == "A" && req.query.id ) {
    	const data=req.body;
        client.query('UPDATE employee SET username =($2) WHERE id = ($1);',[req.query.id,data.email], function(err, result) {
            if (err) {
                return next(err);
            }
            res.send(200);
            //res.render('mainMenuAdmin',{name:req.session.email});
        });
    } else {
        res.render('adminLogin', { err: "Invalid credentials" });
    }
};
