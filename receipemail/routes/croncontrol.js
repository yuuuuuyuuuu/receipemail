module.exports = CronControl;

var cronJob = require('cron').CronJob;
var cronTime = "0 30 9 * * *"; // default
var job = null;

var D = true; // Debug
var TAG = "CronControl::";


function CronControl()
{
	if(D) console.log(TAG +  "constructor");
}

CronControl.prototype.setSchedule = function(newCronTime)
{
	cronTime = newCronTime;
};

CronControl.prototype.startJob = function(onTickCallback)
{
	if(D) console.log(TAG + "startJob called");

	job = new cronJob({
		cronTime: cronTime,
		onTick: onTickCallback,
		onComplete: function(){
			if(D) console.log(TAG + "onComplete");
		},
		start: true
	});

	job.start();
};

CronControl.prototype.stopJob = function()
{
	if(D) console.log(TAG + "stopJob called");

	if(null === job) return;
	job.stop();
};
