module.exports = GCMControl;

var gcm = require('node-gcm');

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