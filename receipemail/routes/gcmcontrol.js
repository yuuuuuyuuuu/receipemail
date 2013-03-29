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

  	// Actual sending is executed inside callback function
  	var allIds = userDbModel.getAllRegistrationIds(onDbResultCallback);

  	// set message
  	message = new gcm.Message();
  	message.addData('notification_title', "test_no_title");
  	message.addData('info_title', "test_title");
  	message.addData('info_content', "test_content");
  	message.addData('info_url', "http://cookpad.com/recipe/2129479");
}


function onDbResultCallback(err, docs)
{
	if(D) console.log(TAG + "find callback");
	if(D) console.log(docs);

	// Extract registration id
	var dataLength = docs.length;
	if(D) console.log("Data Length: " + dataLength);
	registrationIds.length = 0;
	for(var i = 0; i < dataLength; i++)
	{
		registrationIds.push(docs[i].registration_id);
	}

	// test device
	registrationIds.push("APA91bFDAfb30jsGncKxkARNMNS0mrpF-olXQNXrftojYMfU46XMQhy_aIOs2gFfZ68BJqSolUJwDR1AA8hJ2mpk5rZsz8XyMWpzfvovtug0dA7HroiO9StuEDl3Ii0R888NWrsejblq");

	if(D) console.log(registrationIds);

  	sender.send(message, registrationIds, 4, function(err, result){
  		if(D) console.log(TAG + "Send callback called");
  		if(D) console.log(result);
  	});

}