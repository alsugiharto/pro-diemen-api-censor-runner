// get library express
const express = require('express');
const CronJob = require('cron').CronJob;
const request = require('request');
const nodeCmd = require('node-cmd');
const data_point = require('./diemen_config.json');

var cron_time = '*/15 * * * * *';

new CronJob(cron_time, function() {

	// run the command and get the callback in data	
	nodeCmd.get(data_point.cmd, function(err, data, stderr){

		// check for extra function
		if(data_point.extra_function == 'times100'){
			data *= 100;
		}

		// post the request
		request.post(
			data_point.url,
      			{ json: {"id": data_point.point_table_id, "point_value": data} },
      			function (error, response, body) {
          			console.log(data_point);
				if (!error && response.statusCode == 200) {
					console.log(response.body);
					console.log('1 point is saved successfully');
				}else{
					console.log('ERROR IS HAPPENING');
					console.log(error);
					console.log(body);
				}
				console.log('====================');
      			}
  		);

	});

}, null, true, 'America/Los_Angeles');
