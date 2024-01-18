import { Context } from 'koa'
const Router = require('@koa/router')

export function api() {
  const router = new Router()
  // 指定路由
  router.get('/api/test/ping', async function (ctx: Context) {
    ctx.status = 200
    ctx.body = {
      result: 'ok'
    }
    return ctx
  })
  return router
}

