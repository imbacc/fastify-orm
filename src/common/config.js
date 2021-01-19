const env = process?.env?.NODE_ENV?.trim() || 'dev'
const md5 = require('md5-node')

// 定义全局属性
global.api_cache = {}

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
		createTable: false // 重新生成数据库
	},
	prod: {
		host: '127.0.0.1',
		username: 'root',
		password: 'root',
		port: 3306,
		database: 'test',
		createTable: false // 重新生成数据库
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

const mysql = mysql_config[env]
const redis = redis_config[env]
const jwtkey = jwt_config[env]
const apitime = Boolean(env === 'dev')
const limit = limit_config[env]

// 按需导出
module.exports.mysql = mysql
module.exports.redis = redis
module.exports.jwtkey = jwtkey
module.exports.apitime = apitime
module.exports.limit = limit

// 默认导出
module.exports = {
	mysql,
	redis,
	jwtkey,
	apitime,
	limit
}