module.exports = UserDbModel;

var dbUrl = "mongodb://localhost/userdb";
var mongoose = require('mongoose');
var moment = require('moment');
var db = null;

var Schema = mongoose.Schema;
var RecordSchema =  new Schema({
	user_id:{type:String},
	registration_id:{type:String},
	db_registration_date:{type:String},
	user_registration_date:{type:String},
	email_time:{type:String},
	favorite_category_1:{tyoe:String},
	favorite_category_2:{type:String},
	favorite_category_3:{type:String}
});

var idToRegister = "";

var D = true; // Debug
var TAG = "UserDbModel::";

function UserDbModel()
{
	if(D) console.log(TAG +  "constructor");
};

UserDbModel.prototype.initDb = function()
{
	
};

UserDbModel.prototype.connect =  function()
{
	if(D) console.log(TAG + "connect");
	if(null === db) db = mongoose.connect(dbUrl);
};

UserDbModel.prototype.register = function(registrationId)
{
	if(D) console.log(TAG + "register");
	//if(D) console.log(TAG + "userId=" + userId);
	if(D) console.log(TAG + "registrationId=" + registrationId);

	var Record = db.model("Record", RecordSchema);
	var record = new Record();
	idToRegister = registrationId;

	// Check Existence & register if not registered yet.
	isAlreadyRegisterd(idToRegister);

};

UserDbModel.prototype.getAllRegistrationIds = function(onDbSearchResultReceived_Callback)
{
	if(D) console.log(TAG + "getAllRegistrationIds called");

	var Record = db.model("Record", RecordSchema);
	Record.find({}, onDbSearchResultReceived_Callback);
};

function isAlreadyRegisterd(registration_id) 
{
	var alreadyRegisterd = false;

	// Search
	var Record = db.model("Record", RecordSchema);
	Record.find({"registration_id":registration_id}, onDbExistenceCheckCallback);

	return alreadyRegisterd;
};

function onDbExistenceCheckCallback(err, docs)
{
	if(D) console.log(TAG + "onDbExistenceCheckCallback called");
	if(D) console.log(docs);

	var foundDataLength = docs.length;
	if(D) console.log(TAG + "FoundDataLength:" + foundDataLength);

	if(0 == foundDataLength)
	{
		// Register to DB
		if(D) console.log(TAG + "Registering to DB");
		onRegisterId();
	}
	else
	{
		// Skip registration
		if(D) console.log(TAG + "Stop registering to DB because of duplicated data");
	}

}

function onRegisterId()
{
	var Record = db.model("Record", RecordSchema);
	var record = new Record();

	// set data
	record.registration_id = idToRegister;
	record.db_registration_date = moment();
	record.user_registration_date = moment();
	record.email_time = moment("Dec 25, 1995");
	record.favorite_category_1 = "f1";
	record.favorite_category_2 = "f2";
	record.favorite_category_3 = "f3";

    // register
	record.save(function(err) {
		if(D) console.log(TAG + "Registration finished");
  		if (err) { console.log(err); }
	});
}