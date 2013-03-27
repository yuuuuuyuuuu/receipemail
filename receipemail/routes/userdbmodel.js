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

var D = true; // Debug
var TAG = "UserDbModel::";

function UserDbModel()
{
	if(D) console.log(TAG +  "constructor");
}

UserDbModel.prototype.initDb = function()
{
	
}


UserDbModel.prototype.connect =  function()
{
	if(D) console.log(TAG + "connect");
	db = mongoose.connect(dbUrl);
}

UserDbModel.prototype.register = function(userId, registrationId)
{
	if(D) console.log(TAG + "register");
	if(D) console.log(TAG + "userId=" + userId);
	if(D) console.log(TAG + "registrationId=" + registrationId);

	var Record = db.model("Record", RecordSchema);
	var record = new Record();

	// set data
	record.user_id = userId;
	record.registration_id = registrationId;
	record.db_registration_date = moment();
	record.user_registration_date = moment();
	record.email_time = moment("Dec 25, 1995");
	record.favorite_category_1 = "f1";
	record.favorite_category_2 = "f2";
	record.favorite_category_3 = "f3";


	record.save(function(err) {
  		if (err) { console.log(err); }
	});
}

UserDbModel.prototype.getAllRegistrationIds = function()
{
	if(D) console.log(TAG + "getAllRegistrationIds called");

	var Record = db.model("Record", RecordSchema);
	Record.find({}, function(err, docs){
		if(D) console.log("find callback");
		if(D) console.log(docs);
	});
}