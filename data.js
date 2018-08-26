module.exports = {
	// used by request
	url: 'http://invibots.com:4000/api/point',
	// used by mongodb as database name
	id : 123123123,
	// used by node-cmd
	cmd: "ls -l . | egrep -c '^-'",
	// used by cron (nodejs cronjob)
	crontime: '*/15 * * * * *'
}
