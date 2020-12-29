const split = require('split2')
const stream = split(JSON.parse)
const fastify = require('fastify')({
	logger: false,	// 日志信息
	// level: 'info',
	// stream: stream,
	// redact: ['req.headers.authorization'],
	// serializers: {
	// 	req: (req) => {
	// 		return { 
	// 			url: req.url,
	// 			path: req.path,
	// 			method: req.method,
	// 			headers: req.headers,
	// 			hostname: req.hostname,
	// 			parameters: req.parameters,
	// 			remoteAddress: req.ip,
	// 			remotePort: req.connection.remotePort
	// 		}
	// 	}
	// }
 })
const port = 3000	// 默认端口
const ip = '127.0.0.1'	// 指定监听的地址 当部署在 Docker 或其它容器上时，明智的做法是监听 0.0.0.0
const queue = 511	// 指定积压队列的大小

console.log("fastify.use=", fastify.use)

fastify.register(require('./common/decorate')) 	//注册装饰器
fastify.register(require('./common/intercept')) //注册拦截器
fastify.register(require('./common/throw')) 	//注册异常处理
fastify.register(require('./common/middle')) 	//注册中间件
fastify.register(require('./common/tools')) 	//注册插件 
fastify.register(require('./router/index')) 	//注册路由
fastify.register(require('./db/mysql')) 		//注册Mysql
fastify.register(require('./db/redis')) 					//注册Redis

//启动服务	nodemon	index
fastify.listen(port, ip, queue, (err)=>{
	if(err) throw err
	console.log(`服务指向IP: ${ip}`)
	console.log(`服务监听端口: ${port}`)
	// console.log(`路由树形结构:\n ${fastify.printRoutes()}`)
})