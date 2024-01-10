// 引入axios库，用于发送HTTP请求
const axios = require('axios');

// 定义一个异步函数，用于发送请求
const sendRequest = async (url, data, headers) => {
  try {
    // 使用axios发送POST请求
    const res = await axios.post(url, data, { 
      headers,
      // 对所有状态码都视为成功，避免直接抛出错误
      validateStatus: function (status) {
        return true; 
      }
    });
    // 如果状态码不是200，打印响应数据的状态
    if (res.status !== 200) {
      console.log(res.data.stat);
    } else {
      // 如果是登录接口，获取session
      if (url === 'http://127.0.0.1:3270/api/user/login') {
        // 从响应头中获取session
        const setCookieHeader = res.headers['set-cookie'];
        if (setCookieHeader && setCookieHeader.length > 0) {
          // 使用正则表达式从cookie中提取session
          const match = setCookieHeader[0].match(/session=([^;]*)/);
          const session = match ? match[1] : null;
          // 打印session
          console.log(session);
        } else {
          // 如果响应头中没有session，打印提示信息
          console.log('返回头中没有session');
        }
      }
      // 打印响应数据的状态
      console.log(res.data.stat);
    }
  } catch (error) {
    // 如果发生错误，打印错误信息
    console.error(`Error: ${error.message}`);
  }
}

// 定义一个异步函数，用于注册用户
const register = async () => {
  await sendRequest('http://127.0.0.1:3270/api/user/register', {
    account: '123asd',
    password: '123asdd'
  }, {
    'content-type': 'application/json'
  });
}

// 定义一个异步函数，用于登录用户
const login = async () => {
  await sendRequest('http://127.0.0.1:3270/api/user/login', {
    account: '123asd',
    password: '123asdd'
  }, {
    'content-type': 'application/json'
  });
}

// 调用注册和登录函数
register();
login();