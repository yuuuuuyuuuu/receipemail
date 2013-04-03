// This main.js is initial point of this application
// main.js creates objects needed for furture process in this application

////////////////////////////////////////////////
// AppMain Class
module.exports = AppMain;

var GCMControl = require('../routes/gcmcontrol');
var UserDbModel = require('../routes/userdbmodel');

// Debug
var D = true; // Debug
var TAG = "AppMain::";

function AppMain()
{
	if(D) console.log(TAG +  "constructor");
};

AppMain.prototype._init = function()
{

};

////////////////////////////////////////////////
// Access Handling

exports.register = function(req, res){

  // DB Model
  var userDbModel = new UserDbModel();
  userDbModel.connect();

  userDbModel.register(req.body.registrationId);


  // Post Data
  if(D) console.log(req.body.postValue1);

  res.redirect("/");
  //res.send("respond with a resource");

};

exports.send = function(req, res){

	var title = req.body.info_title;
	var content = req.body.info_content;
	var url = req.body.info_url;

	if(D) console.log(TAG + "send called");
	if(D) console.log("info_title:" + title);
	if(D) console.log("info_content:" + content);
	if(D) console.log("info_url:" + url);
	
	var gcmControl = new GCMControl();
	gcmControl.init();
	gcmControl.send(title, content, url)

	res.redirect("/");
};
