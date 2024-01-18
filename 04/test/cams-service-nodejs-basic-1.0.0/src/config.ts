import * as dotenv from 'dotenv'
dotenv.config()

interface Config {
  port: number
  appid: string
  appkey: string
}

const config: Config = {
  port: process.env.HTTP_KPORT ? parseInt(process.env.HTTP_KPORT) : 8000,
  appid: process.env.AK,
  appkey: process.env.SK,
}

export default config
