// 获取module文件下子模块内容
const fs = require('fs')
const fs_modules = (fastify) => {
	const path = './src/router/modules', modules = []
	fs.readdirSync(path).map((fileName) => {
		modules.push(require(`./modules/${fileName}`)(fastify))
	})
	return modules
}

module.exports = (fastify) => {
	const list = fs_modules(fastify)
	
	console.time('\x1B[32m生产路由\x1B[0m')
	list.forEach((info)=> info.map((module)=> fastify.route(module))) //循环子模块路由配置 生产路由
	console.timeEnd('\x1B[32m生产路由\x1B[0m')

	// console.log(list)	// 打印所有路由
}