//版本模块路由
module.exports = (fastify) => [
	{
		method: 'GET',
		url: '/version',
		handler: async (req, reply) => {
			const token = await reply.jwtSign({ uuid: 1008611, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
			fastify.exec.app_info.findAll().then(res => {
				console.log('fastify.exec=', res)
				reply.send(token)
			})
		},
		schema: {
			querystring: {
				id: {type: 'number'}
			}
		},
	}
]
