module.exports = GCMControl;

var gcm = require('node-gcm');
var UserDbModel = require('../routes/userdbmodel');

var message = null;
var sender = null;
var registrationIds = [];
var apiKey = "AIzaSyDSF73joTmX_DCOC8z9qq9xlAzEStt69pg";

var DATA_NAME_NOTIFICATION_TITLE = "notification_title";
var DATA_NAME_INFO_TITLE = "info_title";
var DATA_NAME_INFO_CONTENT = "info_content";
var DATA_NAME_INFO_URL = "info_url";
var STRING_NOTIFICATION_TITLE = "今晩のレシピをお届け！";

var userDbModel = null;

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
	
};

GCMControl.prototype.send = function(info_title, info_content, info_url)
{
	if(D) console.log(TAG + "send called");

	// DB Model
  	userDbModel = new UserDbModel();
  	userDbModel.connect();

  	// Actual sending is executed inside callback function
  	var allIds = userDbModel.getAllRegistrationIds(onDbResultCallback);

  	// set message
  	message = new gcm.Message();
  	message.addData(DATA_NAME_NOTIFICATION_TITLE, STRING_NOTIFICATION_TITLE);
  	message.addData(DATA_NAME_INFO_TITLE, info_title);
  	message.addData(DATA_NAME_INFO_CONTENT, info_content);
  	message.addData(DATA_NAME_INFO_URL, info_url);
};


function onDbResultCallback(err, docs)
{
	if(D) console.log(TAG + "find callback");
	if(D) console.log(docs);

	userDbModel.disconnect();

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