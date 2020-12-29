//版本模块路由
module.exports = (fastify) => [
	{
		method: 'GET',
		url: '/version',
		handler: async (req, reply) => {
			const token = reply.jwtSign({ uuid: 1008611, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
			// fastify.exec.get_table('app_info','select',[[],'del','where id = ?'],[req.query.id]).then((res)=>{
			// 	 res['token'] = token
			// 	 reply.send(res)
			// })
			const list = await fastify.exec.modules.app_info.findAll()
			console.log('list=', list)
			reply.send(list)
		},
		schema: {
			querystring: {
				id: {type: 'number'}
			}
		},
	}
]
