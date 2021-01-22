const { jwtkey, swagger } = require('./config')
const path = require('path')
const fastifyJwt = require('fastify-jwt')

module.exports = (fastify) => {
	//JWT令牌
	fastify.register(fastifyJwt, { secret: jwtkey })
}