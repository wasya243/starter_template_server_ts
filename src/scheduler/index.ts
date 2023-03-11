const schedule = require('node-schedule-tz');

import { testJob } from "./jobs/test-job";

export const initJobs = () => {
  schedule.scheduleJob('* * * * *', testJob);
};
