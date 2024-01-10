/**
 * 使用tcp来实现简单的http/1.1 server
 * 该程序仅用于演示学习http协议，不能用于生产环境
 */
const fs = require('fs')
const net = require('net')
const path = require('path')
const crypto = require('crypto')
const queryString = require('querystring')
let users = {};
// 状态码信息
let status = new Map([
  [200, 'OK'],
  [302, 'Found'],
  [403, 'Forbidden'],
  [404, 'Not Found'],
  [405, 'Method Not Allowed'],
  [500, 'Internal Server Error']
])

// MimeType
let types = new Map([
  ['txt', 'text/plain; charset=utf-8'],
  ['html', 'text/html; charset=utf-8'],
  ['css', 'text/css; charset=utf-8'],
  ['js', 'application/javascript; charset=utf-8'],
  ['json', 'application/json; charset=utf-8'],
  ['png', 'image/png'],
  ['jpg', 'image/jpeg']
])

// 构建响应报文，用\r\n\连接
function buildResponse(statusCode, content, type, headers = []) {
  let length = Buffer.from(content).byteLength
  let _headers = [
    `HTTP/1.1 ${statusCode} ${status.get(statusCode) || ''}`,
    `Server: TestServer`,
    `Date: ${new Date().toUTCString()}`,
    `Content-Type: ${type}`,
    `Content-Length: ${length}`,
    `Connection: keep-alive`
  ]
  _headers = _headers.concat(headers)
  return Buffer.concat([
    Buffer.from(`${_headers.join('\r\n')}\r\n\r\n`),
    Buffer.from(content)
  ])
}

// 渲染错误页面
function renderError(statusCode) {
  let tpl = `<html><head><title>{title}</title></head><body>{body}</body></html>`
  let message = status.get(statusCode) || ''
  let content = tpl
    .replace('{title}', statusCode)
    .replace('{body}', `<h1>${statusCode} ${message}</h1>`)
  return buildResponse(statusCode, content, types.get('html'))
}

// 返回静态文件内容
async function sendFile(context) {
  try {
    let _path = context.path === '/' ? 'index.html' : context.path
    let file = path.join(__dirname, 'web', _path)
    let stats = await fs.promises.stat(file)
    // 如果路径是一个目录，返回403错误
    if (stats.isDirectory()) {
      return renderError(403)
    }
    let content = await fs.promises.readFile(file)
    let type =
      types.get(path.extname(file).replace('.', '')) ||
      'application/octet-stream'
    return buildResponse(200, content, type)
  } catch (error) {
    // 文件读取失败，返回404错误
    return renderError(404)
  }
}

// 路由表
const routes = new Map([
  ['/api/user/register', register],
  ['/api/user/login', login],
])

// 解析请求报文
function parseRequest(content) {
  let [head, ..._body] = content.split('\r\n\r\n')
  let bodyStr = _body.join('\r\n\r\n')
  let rows = head.split('\r\n')
  // 解析GET参数
  let [method, url] = rows[0].split(' ')
  let [path, query] = url.split('?')
  let params = query ? queryString.parse(query) : {}
  let headers = {}
  // 解析请求头
  for (let i = 1; i < rows.length; i++) {
    let index = rows[i].indexOf(':')
    let name = rows[i].substring(0, index).trim().toLowerCase()
    let value = rows[i].substring(index + 1).trim()
    headers[name] = value
  }
  // 解析post json
  let body = bodyStr
  let type = headers['content-type'] || ''
  if (type.includes('application/json') && method === 'POST' && body !== '') {
    try {
      body = JSON.parse(bodyStr)
    } catch (error) { }
  }
  // 解析cookie
  let cookies = {}
  let cookieStr = headers.cookie || ''
  let tmp = cookieStr.split(';')
  for (let item of tmp) {
    let arr = item.split('=').map(key => key.trim())
    if (arr[0] && arr[1]) cookies[arr[0]] = arr[1]
  }
  // 当前请求的上下文信息
  let context = {
    method,
    path,
    query: params,
    url,
    headers,
    cookies,
    body
  }
  return context
}

// 创建一个tcp server
const server = net.createServer(socket => {
  // 收到请求数据
  socket.on('data', async chunk => {
    try {
      // 解析请求报文
      console.log(chunk.toString())
      let context = parseRequest(chunk.toString('utf-8'))
      // 解析路由，返回响应报文
      let response = null
      let route = routes.get(context.path)
      if (route) response = route(context)
      else response = await sendFile(context)
      socket.write(response)
      console.log(JSON.stringify({
        time: new Date(),
        method: context.method,
        url: context.url
      }))
    } catch (error) {
      console.trace(error)
      let res = renderError(500)
      socket.write(res)
    } 
  })
  socket.on('error', err => {
    if (err.code === 'ECONNRESET') {}
    else {
      throw err;
    }
  })
})

// 设置cookie
function setCookie() {
  // 生成一个随机的session
  let session = crypto.randomBytes(8).toString('hex');
  // 返回设置cookie的头部信息
  return `Set-Cookie: session=${session}; path=/; expires=${new Date(Date.now() + 3600 * 24 * 365 * 1000).toUTCString()}; httpOnly`;
}

// 密码哈希函数
function hashPassword(password) {
  // 创建一个新的哈希实例
  const hash = crypto.createHash('sha256')
  // 更新哈希内容为密码
  hash.update(password)
  // 返回哈希值的十六进制表示
  return hash.digest('hex')
}

// 保存用户信息
function saveUsers() {
  // 将用户信息写入文件
  fs.writeFile('users.json', JSON.stringify(users), (err) => {
    // 如果有错误，打印错误信息
    if (err) {
      console.error('Error:', err)
    }
  })
}

// 验证账号
function validateaccount(account) {
  // 如果账号为空，返回错误信息
  if (!account) {
    return '用户名不能为空';
  }
  // 如果账号长度不在6到12之间，返回错误信息
  if (account.length < 6 || account.length > 12) {
    return '用户名长度必须在 6 到 12 之间';
  }
  // 如果没有错误，返回null
  return null;
}

// 验证密码
function validatePassword(password) {
  // 如果密码为空，返回错误信息
  if (!password) {
    return '密码不能为空';
  }
  // 如果密码长度不在6到12之间，返回错误信息
  if (password.length < 6 || password.length > 12) {
    return '密码长度必须在 6 到 12 之间';
  }
  // 如果密码不包含数字和字母，返回错误信息
  if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
    return '密码必须包含数字和字母';
  }
  // 如果没有错误，返回null
  return null;
}

// 验证账号和密码
function validateCredentials(account, password) {
  // 验证账号
  const accountValidationError = validateaccount(account);
  // 验证密码
  const passwordValidationError = validatePassword(password);
  // 如果账号验证有错误，返回错误信息
  if (accountValidationError) {
    return buildResponse(400, JSON.stringify({ stat: accountValidationError }), types.get('json'))
  }
  // 如果密码验证有错误，返回错误信息
  if (passwordValidationError) {
    return buildResponse(400, JSON.stringify({ stat: passwordValidationError }), types.get('json'))
  }
  // 如果账号和密码相同，返回错误信息
  if (account === password) {
    return buildResponse(400, JSON.stringify({ stat: '用户名和密码不能相同' }), types.get('json'))
  }
  // 如果没有错误，返回null
  return null;
}

// 注册函数
function register(context) {
  // 从请求体中获取账号和密码
  let { account, password } = context.body
  // 验证账号和密码
  const validationError = validateCredentials(account, password);
  // 如果验证有错误，返回错误信息
  if (validationError) {
    return validationError;
  }
  // 对密码进行哈希
  password = hashPassword(password)
  // 如果用户已存在，返回错误信息
  if (users[account]) {
    return buildResponse(400, JSON.stringify({ stat: '该用户已存在！' }), types.get('json'))
  }
  // 保存用户信息
  users[account] = password
  saveUsers()
  // 返回注册成功的信息
  return buildResponse(200, JSON.stringify({ stat: '注册成功！' }), types.get('json'))
}

// 登录函数
function login(context) {
  // 从请求体中获取账号和密码
  let { account, password } = context.body
  // 验证账号和密码
  const validationError = validateCredentials(account, password);
  // 如果验证有错误，返回错误信息
  if (validationError) {
    return validationError;
  }
  // 对密码进行哈希
  password = hashPassword(password)
  // 如果用户名或密码错误，返回错误信息
  if (users[account] !== password) {
    return buildResponse(401, JSON.stringify({ stat: '用户名或密码错误！' }), types.get('json'))
  }
  // 打印登录成功的信息
  console.log('登录成功！')
  // 获取set-cookie头部信息
  const setCookieHeader = setCookie();
  
  // 返回登录成功的信息和set-cookie头部信息
  return buildResponse(200, JSON.stringify({ stat: '登录成功！' }), types.get('json'), [setCookieHeader])
}

// 读取用户信息文件
fs.readFile('users.json', (err, data) => {
  // 如果有错误
  if (err) {
    // 如果文件不存在，创建一个新的文件
    if (err.code === 'ENOENT') {
      fs.writeFile('users.json', '{}', err => {
        if (err) {
          console.error('创建用户信息文件失败: ', err)
        }
      })
    } else {
      // 如果有其他错误，打印错误信息
      console.error('读取用户信息文件失败: ', err)
    }
  } else {
    // 如果没有错误，解析用户信息
    users = JSON.parse(data)
  }
})

// 监听端口
server.listen(3270, () => console.log(3270))
