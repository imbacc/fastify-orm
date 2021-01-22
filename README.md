# fast-fastify
fastify框架，构建结构
文档说明： https://www.w3cschool.cn/fastify/

`
yarn install
`
swagger fastify-static 的包会报错
node_modules\fastify-static\index.js:80
        return reply.raw.statusCode
TypeError: Cannot read property 'statusCode' of undefined

解决方案如下
在node_modules\fastify-static\index.js:62
if (reply.raw.statusCode === 304) {
    改成
if (reply?.raw?.statusCode === 304) {

在node_modules\fastify-static\index.js:80
return reply.raw.statusCode
    改成
return reply?.raw?.statusCode
