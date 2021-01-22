// const split = require('split2')
// const stream = split(JSON.parse)
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

const { port, ip, queue } = require('./common/config').listen

require('./common/decorate')(fastify) 	//注册装饰器
require('./common/intercept')(fastify)  //注册拦截器
require('./common/throw')(fastify) 		//注册异常处理
require('./common/middle')(fastify) 	//注册中间件
require('./common/tools')(fastify) 		//注册插件 
require('./db/sequelize')(fastify) 		//注册sequelize
require('./db/redis')(fastify) 			//注册Redis
require('./router/index')(fastify) 		//注册路由
require('./common/swagger')(fastify)	//注册swagger

//启动服务	nodemon	index
fastify.listen(port, ip, queue, (err)=>{
	if(err) throw err
	console.green(`服务指向IP: ${ip}`)
	console.green(`服务监听端口: ${port}`)
	console.green(`服务已启动: http://${ip}:${port}/`)
	// console.green(`路由树形结构:\n ${fastify.printRoutes()}`)
})