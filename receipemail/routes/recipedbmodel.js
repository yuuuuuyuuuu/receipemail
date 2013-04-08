module.exports = RecipeDbModel;

var dbUrl = "mongodb://localhost/userdb";
var mongoose = require('mongoose');
var moment = require('moment');
var db = null;

var Schema = mongoose.Schema;
var RecordSchema =  new Schema({
	registration_date:{type:String},
	recipe_summary: {type:String},
	recipe_url:{type:String},
	recipe_category1:{type:String}
});

var recipeToRegister = "";
var recipeSummaryToRegister = "";

var D = true; // Debug
var TAG = "RecipeDbModel::";

function RecipeDbModel()
{
	if(D) console.log(TAG +  "constructor");
}

RecipeDbModel.prototype.initDb = function()
{
	
};

RecipeDbModel.prototype.connect =  function()
{
	if(D) console.log(TAG + "connect");
	if(D) console.log(TAG + "new connection created");
	// db = mongoose.connect(dbUrl);
	db = mongoose.createConnection(dbUrl);

};

RecipeDbModel.prototype.disconnect =  function()
{
	if(D) console.log(TAG + "disconnect called");
	mongoose.disconnect();
};

RecipeDbModel.prototype.register = function(recipeUrl, recipeSummary)
{
	if(D) console.log(TAG + "register");
	//if(D) console.log(TAG + "userId=" + userId);
	if(D) console.log(TAG + "recipeUrl=" + recipeUrl);
	if(D) console.log(TAG + "recipeSummary=" + recipeSummary);

	var Record = db.model("Recipe", RecordSchema);
	var record = new Record();
	recipeToRegister = recipeUrl;
	recipeSummaryToRegister = recipeSummary;

	// Check Existence & register if not registered yet.
	isAlreadyRegisterd(recipeToRegister);

};

RecipeDbModel.prototype.getNextRecipe = function(onRecipeSearchResultCallback)
{
	if(D) console.log(TAG + "getNextRecipe called");
	if(D) console.log("db:" + db);
	var recipe = db.model("Recipe", RecordSchema);
	recipe.find({}, onRecipeSearchResultCallback);
};

function isAlreadyRegisterd(recipeUrl)
{
	var alreadyRegisterd = false;

	// Search
	var Record = db.model("Recipe", RecordSchema);
	Record.find({"recipe_url":recipeUrl}, onDbExistenceCheckCallback);

	return alreadyRegisterd;
}

function onDbExistenceCheckCallback(err, docs)
{
	if(D) console.log(TAG + "onDbExistenceCheckCallback called");
	if(D) console.log(docs);

	var foundDataLength = docs.length;
	if(D) console.log(TAG + "FoundDataLength:" + foundDataLength);

	if(0 === foundDataLength)
	{
		// Register to DB
		if(D) console.log(TAG + "Registering to DB");
		onRegisterRecipe();
	}
	else
	{
		// Skip registration
		if(D) console.log(TAG + "Stop registering to DB because of duplicated data");
	}

}

function onRegisterRecipe()
{
	var Record = db.model("Recipe", RecordSchema);
	var record = new Record();

	// set data
	record.recipe_url = recipeToRegister;
	record.recipe_summary = recipeSummaryToRegister;
	record.registration_date = moment();
	record.recipe_category = "category_none";

    // register
	record.save(function(err) {
		if(D) console.log(TAG + "Registration finished");
  		if (err) { console.log(err); }
	});
}