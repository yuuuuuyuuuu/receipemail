module.exports = CronControl;

var cronJob = require('cron').CronJob;
var cronTime = "* * * * * *";
var job = null;

var D = true; // Debug
var TAG = "CronControl::";


function CronControl()
{
	if(D) console.log(TAG +  "constructor");

	_init();
};

function _init()
{
	job = new cronJob({
		cronTime: cronTime,
		onTick: function(){
			if(D) console.log(TAG + "onTick");
		},
		onComplete: function(){
			if(D) console.log(TAG + "onComplete");
		},
		start: false,
		timeZone: "Japan/Tokyo"
	});

	job.start();
};


CronControl.prototype.initDb = function()
{
	
};
