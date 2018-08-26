// get library express
const express = require('express');
const CronJob = require('cron').CronJob;
const request = require('request');
const nodeCmd = require('node-cmd');
const data_point = require('./data');

// cronjob time
new CronJob(data_point.crontime, function() {

	// run the command and get the callback in data	
	nodeCmd.get(data_point.cmd, function(err, data, stderr){
            	
		// post the request
		request.post(
			data_point.url,
      			{ json: {"id": data_point.id, "point_value": data} },
      			function (error, response, body) {
          			if (!error && response.statusCode == 200) {
					console.log(response.body);
					console.log('1 point is saved');
				}else{
					console.log('ERROR IS HAPPENING');
					console.log(error);
					console.log(body);
					console.log(response);
				}
      			}
  		);

	});

}, null, true, 'America/Los_Angeles');

