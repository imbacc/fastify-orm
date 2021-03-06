const table = process?.env?.CREATE_TABLE?.trim() || false
const env = table || process?.env?.NODE_ENV?.trim() || 'dev'
const md5 = require('md5-node')
console.log('env=', env)

// 定义全局属性
global.api_cache = {}	//api接口缓存
global.base64 = (str) => Buffer.from(str).toString('base64')		//base64加密
global.base64_re = (str) => Buffer.from(str, 'base64').toString()	//base64解密
global.jump_map = new Map()
global.add_jump = (jump = []) => {	//路由不检测 jwt权限
	const map = global.jump_map
	jump.forEach(key => map.set(key, true))
	return map
}

// 赋予路由跳过检测权限
const check_auth = {
	dev: ['/version'],
	prod: ['/version']
}

// 初始化执行
global.add_jump(check_auth[env])

// 端口信息
const listen_config = {
	dev: {
		port: 3000,		// 默认端口
		ip: '127.0.0.1', // 指定监听的地址 当部署在 Docker 或其它容器上时，明智的做法是监听 0.0.0.0
		queue: 511		// 指定积压队列的大小
	},
	prod: {
		port: 3000,
		ip: '127.0.0.1',
		queue: 511
	}
}

// 全局配置
const jwt_config = {
	dev: md5('imbacc'),
	prod: md5('by imbacc')
}

// mysql
const mysql_config = {
	dev: {
		host: '127.0.0.1',
		username: 'root',
		password: 'root',
		port: 3306,
		database: 'test',
		createTable: Boolean(table) // 重新生成数据库
	},
	prod: {
		host: '127.0.0.1',
		username: 'root',
		password: 'root',
		port: 3306,
		database: 'test',
		createTable: Boolean(table) // 重新生成数据库
	},
}

// redis
const redis_config = {
	dev: {
		host: '127.0.0.1',
		port: 6379,
	},
	prod: {
		host: '127.0.0.1',
		port: 6379
	}
}

// redis api限流设置 '路由名字':[每秒,次数]
const limit_config = {
	dev: {
		'/version': [10, 5],
		'/fff': [1, 20]
	},
	prod: {
		'/version': [10, 5],
		'/fff': [10, 20]
	}
}

// swagger信息
const swagger_config = {
	dev: {
		use: true,
		route: `/swagger/${md5('地址加密')}`,
		info: {
			title: 'REST API Spec',
			description: 'api',
			version: '1.0.0'
		},
		host: 'auto',	// auto为端口ip
		apiKey: {
			type: 'apiKey',
			name: 'apiKey',
			in: 'header'
		}
	},
	prod: {
		use: false,
		route: `/swagger/${md5('地址加密')}`,
		info: {
			title: 'REST API Spec',
			description: 'api',
			version: '1.0.0'
		},
		host: 'auto',
		apiKey: {
			type: 'apiKey',
			name: 'apiKey',
			in: 'header'
		}
	}
}

const mysql = mysql_config[env]
const redis = redis_config[env]
const jwtkey = jwt_config[env]
const apitime = Boolean(env === 'dev')
const limit = limit_config[env]
const listen = listen_config[env]
const swagger = swagger_config[env]

// 按需导出
module.exports.mysql = mysql
module.exports.redis = redis
module.exports.jwtkey = jwtkey
module.exports.apitime = apitime
module.exports.limit = limit
module.exports.listen = listen
module.exports.swagger = swagger

// 默认导出
module.exports = {
	mysql,
	redis,
	jwtkey,
	apitime,
	limit,
	listen,
	swagger
}