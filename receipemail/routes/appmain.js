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
var recipeDbModel = null;

var recipeIndex = 0;

var STRING_RECIPE_CONTENT = "レシピメール";

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
	if(null === userDbModel)
	{
		userDbModel = new UserDbModel();
		userDbModel.connect();
	}
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

	if(null === gcmControl)
	{
		gcmControl = new GCMControl();
		gcmControl.init();
    }

	gcmControl.send(title, content, url);

	// res.render('index', { title: 'Express' });
	res.redirect("/");
};

exports.distributeDbRecipe = function(req, res){
	if(D) console.log(TAG + "distributeDbRecipe called");

	recipeDbModel = new RecipeDbModel();
	recipeDbModel.connect();
	recipeDbModel.getNextRecipe(onRecipeSearchResult);

	res.redirect("/");
};

exports.registerRecipe = function(req, res){
	if(D) console.log(TAG + "registerRecipe called");

	var recipe_url = req.body.recipe_url;
	var recipe_summary = req.body.recipe_summary;
	if(D) console.log("recipe_url:" + recipe_url);
	if(D) console.log("recipe_summary:" + recipe_summary);

	var recipeDbModel = new RecipeDbModel();
	recipeDbModel.connect();

	recipeDbModel.register(recipe_url, recipe_summary);

	res.redirect("/");
};

function onRecipeSearchResult(err, docs)
{
	if(D) console.log(TAG + "onRecipeSearchResult called");
	if(D) console.log("docs:" + docs);

	// Disconnect DB
	// recipeDbModel.disconnect();

	var recipeDataLength = docs.length;
	if(D) console.log("RecipeDataLength:" + recipeDataLength);
	if(0 === recipeDataLength)
	{
		console.log("Delivery canceled since no data to send found");
		return;
	}

	// send data
	var nextRecipe = docs[recipeIndex];
	var nextRecipeUrl = nextRecipe.recipe_url;
	var nextRecipeSummary = nextRecipe.recipe_summary;

	if(D) console.log("recipeIndex:" + recipeIndex);
	if(D) console.log("nextRecipeUrl:" + nextRecipeUrl);
	if(D) console.log("nextRecipeSummary:" + nextRecipeSummary);

	if(undefined === nextRecipeUrl
		|| undefined === nextRecipeSummary)
	{
		if(D) console.log("Stop sending since undefined param found");
	}
	else
	{
		// send message
		sendGCMMessage(nextRecipeSummary, STRING_RECIPE_CONTENT, nextRecipeUrl);
	}

	// update
	recipeIndex++;
	if(recipeIndex == recipeDataLength)
	{
		if(D) console.log("Reset recipeIndex");
		recipeIndex = 0;
	}

}

function sendGCMMessage(title_string, content_string, url_string)
{
	if(D) console.log(TAG + "sendGCMMessage called");
	if(D) console.log("title_string:" + title_string);
	if(D) console.log("content_string:" + content_string);
	if(D) console.log("url_string:" + url_string);

	var gcmControl = new GCMControl();
	gcmControl.init();
	gcmControl.send(title_string, content_string, url_string);
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
