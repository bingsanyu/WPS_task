# 第二次作业

1. 参考node-http开发一个http服务，实现两个接口:

1.1 注册接口

| 方法 | POST |
|---|---|
|URL| /api/user/register |
| 请求体| { account: string; password: string } |
| 返回值 | { stat: string } |

  该接口需要将账密加密保存至本地的文件中,例如，传过来的数据是`{ account: 'bob'; password: "123qwe" }`, 保存至本地的内容密码不能是`123qwe`，加密算法可以随机选。重复注册错误、密码安全系数低等异常情况返回相应的错误。

1.2 登录接口

| 方法 | POST |
|---|---|
|URL| /api/user/login |
| 请求体| { account: string; password: string } |
| 返回值 | { stat: string } |
| 返回Header | 需要包含Set-Cookie |

  该接口需要将传过来的账密，进行验证，若验证通过，则需随机生成一个字符串，当做是session值返回；验证不通过则返回相应的错误。

2. 参考 `client.js`，使用 `axios` 调用第一步编写好的接口。将各种正常、异常情况都调用到，并打印出请求结果。