import config from './config'
import app from './app'

const startServer = () => {
  try {
    app.listen(config.port, () => {
      console.log(`server running on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

startServer()
