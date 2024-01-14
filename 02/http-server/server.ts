import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as crypto from 'crypto';
import * as path from 'path';
import * as serve from 'koa-static'
import bodyParser from 'koa-body';
import * as fs from 'fs-extra';

interface User {
  [key: string]: string;
}

let users: User = {};

const app = new Koa();
const router = new Router();

// 密码哈希函数
function hashPassword(password: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

// 验证账号
function validateAccount(account: string): string | null {
  if (!account) {
    return '用户名不能为空';
  }
  if (account.length < 6 || account.length > 12) {
    return '用户名长度必须在 6 到 12 之间';
  }
  return null;
}

// 验证密码
function validatePassword(password: string): string | null {
  if (!password) {
    return '密码不能为空';
  }
  if (password.length < 6 || password.length > 12) {
    return '密码长度必须在 6 到 12 之间';
  }
  if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
    return '密码必须包含数字和字母';
  }
  return null;
}

// 验证账号和密码
function validateCredentials(account: string, password: string): string | null {
  const accountValidationError = validateAccount(account);
  const passwordValidationError = validatePassword(password);
  if (accountValidationError) {
    return accountValidationError;
  }
  if (passwordValidationError) {
    return passwordValidationError;
  }
  if (account === password) {
    return '用户名和密码不能相同';
  }
  return null;
}

// 注册函数
router.post('/api/user/register', async (ctx) => {
  const { account, password } = ctx.request.body;
  const validationError = validateCredentials(account, password);
  if (validationError) {
    ctx.status = 400;
    ctx.body = { stat: validationError };
    return;
  }
  const hashedPassword = hashPassword(password);
  if (users[account]) {
    ctx.status = 400;
    ctx.body = { stat: '该用户已存在！' };
    return;
  }
  users[account] = hashedPassword;
  await fs.writeJson('users.json', users);
  ctx.body = { stat: '注册成功！' };
});

// 登录函数
router.post('/api/user/login', async (ctx) => {
  const { account, password } = ctx.request.body;
  const validationError = validateCredentials(account, password);
  if (validationError) {
    ctx.status = 400;
    ctx.body = { stat: validationError };
    return;
  }
  const hashedPassword = hashPassword(password);
  if (users[account] !== hashedPassword) {
    ctx.status = 401;
    ctx.body = { stat: '用户名或密码错误！' };
    return;
  }
  ctx.cookies.set('session', crypto.randomBytes(8).toString('hex'), { httpOnly: true });
  ctx.body = { stat: '登录成功！' };
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(path.join(__dirname, 'web')));

fs.readJson('users.json')
  .then((data) => {
    users = data;
  })
  .catch(async (err) => {
    if (err.code === 'ENOENT') {
      await fs.writeJson('users.json', {});
    } else {
      console.error('读取用户信息文件失败: ', err);
    }
  });

app.listen(3270, () => console.log('Server running on port 3270'));