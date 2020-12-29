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

console.log(fastify.md5)
require('./common/decorate')(fastify) 	//注册装饰器
require('./common/intercept')(fastify)  //注册拦截器
require('./common/throw')(fastify) 		//注册异常处理
require('./common/middle')(fastify) 	//注册中间件
require('./common/tools')(fastify) 		//注册插件 
require('./router/index')(fastify) 		//注册路由
require('./db/mysql')(fastify) 			//注册Mysql
require('./db/redis')(fastify) 			//注册Redis


//启动服务	nodemon	index
fastify.listen(port, ip, queue, (err)=>{
	if(err) throw err
	console.log(`服务指向IP: ${ip}`)
	console.log(`服务监听端口: ${port}`)
	// console.log(`路由树形结构:\n ${fastify.printRoutes()}`)
})