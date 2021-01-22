module.exports = (fastify) => {
	console.green('开启中间件...')
	fastify.register(require('fastify-cors'), { 
		// put your options here
	})
	// fastify.use(require('hide-powered-by')())
	// fastify.use(require('x-xss-protection')())
}