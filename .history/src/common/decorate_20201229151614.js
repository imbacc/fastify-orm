const log = console.log
const error = console.error

console.log = new Proxy(log, {
    apply(target, _this, args) {
        log('target=', target)
        log('_this=', _this)
        log('args=', args)
        Reflect.apply(...arguments)
    }
})


module.exports = (fastify) => {
    console.log('开启装饰器...')	//只配置静态
    
	fastify.decorate('md5', require('md5-node'))	//fastify.config.test
	fastify.decorate('config', require('../common/config'))	//fastify.config.test
	
	fastify.decorate('cache_sql',(sql,val,time,req) => {
        return fastify.exec.call_async(sql,val).then((res)=> {
            const onlyid = fastify.md5(req.headers.authorization) || ''
            if(res.code === 1) fastify.set_redis(`api_${req.raw.originalUrl}_${onlyid}`, res, time) //默认360分钟一个小时 60 * 60
            return res
        })
    })
}