import schedule from 'node-schedule'

import { testJob } from './jobs/test-job'

export const initJobs = () => {
  schedule.scheduleJob('* * * * *', testJob)
}
