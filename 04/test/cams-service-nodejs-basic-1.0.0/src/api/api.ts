import axios from 'axios';
import { Context } from 'koa'
const Router = require('@koa/router')

export function api() {
  const router = new Router()
  
  router.get('/api/test/ping', async function (ctx: Context) {
    ctx.status = 200
    ctx.body = {
      result: 'ok'
    }
    return ctx
  })

  const baseUrl = 'http://encs-pri-cams-engine/i/docmini';

  router.post('/api/dept/create', async function (ctx: Context) {
    const { name, companyId } = ctx.request.body;
  
    // 获取根部门
    const rootDeptRes = await axios.get(`${baseUrl}/org/dev/v1/companies/${companyId}/depts/root`);
    if (rootDeptRes.status !== 200) {
      ctx.status = rootDeptRes.status;
      ctx.body = rootDeptRes.data;
      return ctx;
    }
    const rootDeptId = rootDeptRes.data.data.id;
  
    // 创建子部门
    const createDeptRes = await axios.post(`${baseUrl}/org/dev/v1/companies/${companyId}/depts/${rootDeptId}`, {
      name: name
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    ctx.status = createDeptRes.status;
    ctx.body = createDeptRes.data;
    return ctx;
  });
  return router
}

