module.exports = GCMControl;

var gcm = require('node-gcm');
var UserDbModel = require('../routes/userdbmodel');

var message = null;
var sender = null;
var registrationIds = [];
var apiKey = "AIzaSyDSF73joTmX_DCOC8z9qq9xlAzEStt69pg";

var D = true; // Debug
var TAG = "GCMControl::";

function GCMControl()
{
	if(D) console.log(TAG +  "constructor");
}

GCMControl.prototype.init = function()
{
	message = new gcm.Message();
	sender = new gcm.Sender(apiKey);

}

GCMControl.prototype.getRegistrationData = function()
{
	
}

GCMControl.prototype.send = function(message_string)
{
	// DB Model
  	var userDbModel = new UserDbModel();
  	userDbModel.connect();
  	var allIds = userDbModel.getAllRegistrationIds();

  	message.addData('key1', message_string);

  	registrationIds.push('AIzaSyDSF73joTmX_DCOC8z9qq9xlAzEStt69pg');

  	sender.send(message, registrationIds, 4, function(err, result){
  		if(D) console.log(TAG + "Send callback called");
  		if(D) console.log(result);
  	});
}