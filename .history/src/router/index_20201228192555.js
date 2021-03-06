// 获取module文件下子模块内容
const fs = require('fs')
const fs_modules = (name, fastify) => {
	let path = `./src/router/modules`, modules = []
	fs.readdirSync(path).map((fileName) => {
		modules.push(require(`${path}/${fileName}}`)(fastify))
	})
	return modules
}

module.exports = (fastify) => {
	// const list = [
	// 	require('./modules/user')(fastify),		//用户模块路由
	// 	require('./modules/version')(fastify),	//版本模块路由
	// ]
	const list = fs_modules(fastify)
	
	console.time('生产路由')
	list.forEach((info)=> info.map((module)=> fastify.route(module))) //循环子模块路由配置 生产路由
	console.timeEnd('生产路由')
	
	// console.log(list)	//打印所有路由
}