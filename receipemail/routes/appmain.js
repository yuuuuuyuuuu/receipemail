// This main.js is initial point of this application
// main.js creates objects needed for furture process in this application

////////////////////////////////////////////////
// AppMain Class
var GCMControl = require('../routes/gcmcontrol');
var UserDbModel = require('../routes/userdbmodel');
var RecipeDbModel = require('../routes/recipedbmodel');
var CronControl = require('../routes/croncontrol');
var Time = require('time');
var time = null;

var gcmCOntrol = null;
var userDbModel = null;

var D = true;
var TAG = "appMain::";

////////////////////////////////////////////////
// Access Handling
exports.index = function(req, res){

	_init();
	res.render('index', { title: 'Express' });
};

exports.registerUser = function(req, res){

	if(D) console.log(TAG + "register called");

	// DB Model
    var userDbModel = new UserDbModel();
    userDbModel.connect();

    userDbModel.register(req.body.registrationId);

	res.redirect("/");
};

exports.distributeRecipe = function(req, res){

	var title = req.body.info_title;
	var content = req.body.info_content;
	var url = req.body.info_url;

	if(D) console.log(TAG + "send called");
	if(D) console.log("info_title:" + title);
	if(D) console.log("info_content:" + content);
	if(D) console.log("info_url:" + url);

	var gcmControl = new GCMControl();
	gcmControl.init();
	gcmControl.send(title, content, url);

	// res.render('index', { title: 'Express' });
	res.redirect("/");
};

exports.registerRecipe = function(req, res){
	if(D) console.log(TAG + "registerRecipe called");

	var recipe_url = req.body.recipe_url;
	if(D) console.log("recipe_url:" + recipe_url);

	var recipeDbModel = new RecipeDbModel();
	recipeDbModel.connect();

	recipeDbModel.register(recipe_url);

	res.redirect("/");
};

function sendGCMMessage()
{
	if(D) console.log(TAG + "sendGCMMessage called");
	var title = "title_test";
	var content = "content_title";
	var url = "url_test";
	var gcmControl = new GCMControl();
	gcmControl.init();
	gcmControl.send(title, content, url);
}

function _init()
{
	if(D) console.log(TAG + "_init");
}

exports.startCron = function()
{
	console.log(TAG + "startCron called");

	time = new Time.Date();
	console.log("time.toString():" + time.toString());

	var cronSchedule = "10 9 * * *";  // 9 a.m. everyday
	// var cronSchedule = "* * * * * *";  // every seconds
	var cronControl = new CronControl();
	//cronControl.setSchedule(cronSchedule);
	cronControl.startJob(sendGCMMessage);
};
