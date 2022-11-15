const schedule = require('node-schedule-tz')

const testJob = require('./jobs/test-job')

const initJobs = () => {
    schedule.scheduleJob('* * * * *', testJob)
}

module.exports = initJobs