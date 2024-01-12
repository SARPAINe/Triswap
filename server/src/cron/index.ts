import { CronJob } from 'cron'
import { fetchCoins } from './jobs/fetchCoins'

function cronJobs() {
  const job = new CronJob(
    '*/10 * * * * *', // cronTime
    fetchCoins, // onTick
    null, // onComplete
    true, // start
    'America/Los_Angeles', // timeZone
  )
}

export default cronJobs
