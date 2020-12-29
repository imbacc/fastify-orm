//用户模块路由
module.exports = (fastify) => [
    {
      method: 'POST',
      url: '/login',
      handler: (req, reply) => {
        fastify.exec.query('select * from app_infos').then((res) => {
            //只有内容跟数据库不一致 changedRows才会有效
            if(res.code === 1 && res.data.changedRows > 0){
                reply.send(res)
            }else{
                res.data = null
                reply.send(res)
            }
        })
      }
    },
    {
      method: 'GET',
      url: '/fff',
      handler: (req, reply) => {
          //缓存到redis 60分钟 只GET请求缓存!
          // fastify.cache_sql('app_info', 'select * from app_info where id > ?',{
          //   id: 111
          // },60,req).then((res)=>{
            //  reply.send(res)
          // })

          fastify.exec.findAll().then((res)=> {
            reply.send(res)
         })
      }
    },
    {
      method: 'GET',
      url: '/ddd',
      handler: (req, reply) => {
          //调用exec执行类执行 call_async 函数Promise回调
          fastify.exec.findAll().then((res)=> {
             reply.send(res)
          })
      }
    },
    {
      method: 'GET',
      url: '/qqq/:id',
      handler: (req, reply) => {
          console.log(req.params.id)
      }
    },
    {
      method: 'POST',
      url: '/schema',
      handler: (req, reply) => {
          console.log("i am schema")
          // maxParamLength 
          // 你可以为通过 maxParamLength 选项为带参路由 (无论是标准的、正则匹配的，还是复数的) 设置最大参数长度。
          // 选项的默认值为 100 字符。当使用正则匹配的路由时，这非常有用，可以帮你抵御 DoS 攻击。
          // 当达到长度限制时，将触发 not found 路由。

          // bodyLimit
          // 定义服务器可接受的最大 payload，以字节为单位。
          // 默认值：1048576 (1MiB)

          
      },
      schema: {
        body: {
          type: 'object',
          properties: {
            key: { type: 'string', maxParamLength: 10 },
            val: { type: 'number' }
          }
        }
      }
    }
]