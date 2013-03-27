
var UserDbModel = require('../routes/userdbmodel');
var GCMControl = require('../routes/gcmcontrol');

var D = true;  // Debug Flag
var TAG = "UserDb::";

exports.register = function(req, res){

  // DB Model
  var userDbModel = new UserDbModel();
  userDbModel.connect();
  userDbModel.register(req.body.userId, req.body.registrationId);


  // Post Data
  if(D) console.log(req.body.postValue1);

  res.redirect("/");
  //res.send("respond with a resource");

};

exports.send = function(req, res){

	var msg = req.body.message;

	if(D) console.log(TAG + "send called");
	if(D) console.log("Msg:" + msg);
	
	var gcmControl = new GCMControl();
	gcmControl.init();
	gcmControl.send(msg);

	res.redirect("/");
}