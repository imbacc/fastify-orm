module.exports = {
	
	//mysql配置
	mysql:{
		host: '127.0.0.1',
		username: 'root',
		password: 'root',
		port: 3306,
		database: 'test',
		createTable: true // 重新生成数据库
	},
	
	//redis配置
	redis:{
		host: '127.0.0.1',
		port: 6379,
	},
	
	//数据库表信息
	bean: {
		app_info:['id','text','version','os','ostext','linkurl'],
	},
	
	//开启redis api限流 可再开启nginx限流
	apitime: true,
	
	//redis api限流设置 '路由名字':[每秒,次数]
	limit: {
		'/version': [10, 5],
		'/movies/index': [10, 20]
	}
}