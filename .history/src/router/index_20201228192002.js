// 获取module文件下子模块内容

const modulesList = () => {
	const path = "./modules";
	const modulesFiles = require.context("./modules", true, /\.js$/)
	const modules = modulesFiles.keys().reduce((module, modulePath) => {
		const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1")
		const value = modulesFiles(modulePath).default
		module = [ ...module, ...require(`${path}/${moduleName}.js`)(fastify) ]
		return module
	}, {})
}

module.exports = (fastify) => {
	// const list = [
	// 	require('./modules/user')(fastify),		//用户模块路由
	// 	require('./modules/version')(fastify),	//版本模块路由
	// ]
	const list = modulesList()
	
	console.time('生产路由')
	list.forEach((info)=> info.map((module)=> fastify.route(module))) //循环子模块路由配置 生产路由
	console.timeEnd('生产路由')
	
	// console.log(list)	//打印所有路由
}