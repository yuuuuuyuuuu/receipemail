module.exports = UserDbModel;

var dbUrl = "mongodb://localhost/userdb";
var mongoose = require('mongoose');
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

function UserDbModel()
{
	if(D) console.log("UserDbControl constructor");
}

UserDbModel.prototype.initDb = function()
{
	
}


UserDbModel.prototype.connect =  function()
{
	if(D) console.log("UserDbControl _connect");
	db = mongoose.connect(dbUrl);
}

UserDbModel.prototype.register = function()
{
	var Record = db.model("Record", RecordSchema);
	var record = new Record();

	record.user_id = "test_userid";
	record.registration_id = "test_registration_id";

	record.save(function(err) {
  		if (err) { console.log(err); }
	});
}