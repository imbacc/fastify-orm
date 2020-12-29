const config = require('./config')

module.exports = (fastify, options, done) => {
	
	//JWT令牌
	fastify.register(require('fastify-jwt'), { secret: 'imbacc' })

	done()
}