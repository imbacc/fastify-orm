//版本模块路由
module.exports = (fastify) => [
	{
		method: 'GET',
		url: '/version',
		handler: async (req, reply) => {
			const token = await reply.jwtSign({ uuid: 1008611, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
			

			// const token = await fastify.jwt.sign({ uuid: 1008611, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
			// await reply.send('res')
			// fastify.exec.get_table('app_info','select',[[],'del','where id = ?'],[req.query.id]).then((res)=>{
			// 	 res['token'] = token
			// 	 reply.send(res)
			// })
			// const list = await fastify.exec.modules.app_info.findAll()
			console.log('fastify.exec=', fastify.exec)

			reply.send(token)
		},
		schema: {
			querystring: {
				id: {type: 'number'}
			}
		},
	}
]
