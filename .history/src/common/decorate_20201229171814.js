console.green = new Proxy(console.log, {
    apply(target, _this, args) {
        console.log(`\x1B[32m${args.join('')}\x1B[0m`)
    }
})

console.red = new Proxy(console.error, {
    apply(target, _this, args) {
        console.log(`\x1B[31m${args.join('')}\x1B[0m`)
    }
})


module.exports = (fastify) => {
    console.green('开启装饰器...')	//只配置静态
    
	fastify.decorate('md5', require('md5-node'))	//fastify.config.test
	fastify.decorate('config', require('../common/config'))	//fastify.config.test
	
	fastify.decorate('cache_sql',(name, sql, val, time, req) => {
        return fastify.exec[name].query(sql, val).then((res) => {
            const onlyid = fastify.md5(req.headers.authorization) || ''
            if(res.code === 1) fastify.set_redis(`api_${req.raw.originalUrl}_${onlyid}`, res, time) //默认360分钟一个小时 60 * 60
            return res
        })
    })
}