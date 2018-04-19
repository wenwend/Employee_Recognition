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
	/*client.query('SELECT * FROM test;', function(err,result){
		if(err){
			return next(err);
		}
		res.json(result.rows);
	});*/
	res.render('login');
};


module.exports.adminLogin=function(req,res){
	/*client.query('SELECT * FROM test;', function(err,result){
		if(err){
			return next(err);
		}
		res.json(result.rows);
	});*/
	res.render('adminLogin');
};