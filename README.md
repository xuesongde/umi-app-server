# umi-app-server
A server for my umi front end project
## 简介
Token Based Authentication(基于token的身份认证)

Comparing with Session-based Authentication that need to store Session on Cookie, the big advantage of Token-based Authentication is that we store the JSON Web Token (JWT) on Client side: Local Storage for Browser, Keychain for IOS and SharedPreferences for Android… So we don’t need to build another backend project that supports Native Apps or an additional Authentication module for Native App users.

相较于需要存储Session在Cookie中的Session用户身份认证, 基于token身份验证的最大优势在于把JSON Web Token 存储在了客户端. 浏览器存储在本地存储, IOS客户端存储在钥匙串 android客户端存储在轻量级缓存中. 这样针对不同展示的APP创建新的后端项目就完全没必要了.

There are three important parts of a JWT: Header, Payload, Signature. Together they are combined to a standard structure: header.payload.signature.

The Client typically attaches JWT in Authorization header with Bearer prefix:

Authorization: Bearer [header].[payload].[signature]
Or only in x-access-token header

Header, Payload, Signature是JWT的三个重要组成部分, 合并在一起组成一个标准的结构: header.payload.signature. 通常客户端将JWT附加到header中.

此项目使用 x-access-token来接收token

For more details, you can visit:
[In-depth Introduction to JWT-JSON Web Token](https://bezkoder.com/jwt-json-web-token/)

## 功能列表

这个项目使用node.js, express.js, mySql 实现了以下功能接口

| method | urls  | action |
| :----: | :----: | :----: |
| post | /signup | 用户注册 |
| post  | /signin | 用户登录 |
| get  | /users | 查询注册的users |
| delete  | /deleteByUserName/:userId | 根据用户名删除用户 |

## 中间件

中间件两个,用来在接口之前做校验

authJwt 校验token的有效性

verifySignUp 校验用户名唯一性

## 流程图如下:

![image](https://bezkoder.com/wp-content/uploads/2020/02/node-js-mongodb-jwt-authentication-flow.png)


![image](https://bezkoder.com/wp-content/uploads/2020/02/node-js-mongodb-jwt-authentication-architecture.png)

此项目使用mySql数据库, 这个图借用[bezkoder](https://bezkoder.com/node-js-mongodb-auth-jwt/), 流程是一样的.

目前这一版是单表, 后期版本会加上个分页和多表.

