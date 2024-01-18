import * as Koa from 'koa'
import { Context } from 'koa'
import config from './config'
import * as koaLogger from 'koa-logger'
import * as koaBody from 'koa-body'
import { logger } from './ins'
import { api } from './api/api'

const app = new Koa()

app.use(koaLogger())
app.use(koaBody())
const router = api()
app.use(router.routes())

app.listen(config.port)

logger.info({msg: "server start..."})

// 未捕获的Api异常
app.on('request-error', (error: Error, ctx: Context) => {
  logger.error({
    type: 'request-error',
    message: error.message,
    requestId: ctx.requestId
  })
})

// 未捕获的服务异常
app.on('server-error', (error: any) => {
  logger.error({
    type: 'server-error',
    message: error.message
  })
})
// 未捕获的异常
process.on('uncaughtException', err => {
  logger.error({ msg: `未捕获的异常:${err}` })
})
