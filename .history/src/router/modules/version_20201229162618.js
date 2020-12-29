//版本模块路由
module.exports = (fastify) => [
	{
		method: 'GET',
		url: '/version',
		handler: async (req, reply) => {

			// const token = fastify.JWT.sign({ payload: 1111 })
			reply.send({ token: 11111 })
			// const token = await reply.jwtSign(request.body)
			// reply.send({ token: token })

			// const token = await fastify.jwt.sign({ uuid: 1008611, by: 'imbacc' }, { expiresIn: 60 * 60 * 1 })
			// await reply.send('res')
			// fastify.exec.get_table('app_info','select',[[],'del','where id = ?'],[req.query.id]).then((res)=>{
			// 	 res['token'] = token
			// 	 reply.send(res)
			// })
			// const list = await fastify.exec.modules.app_info.findAll()
			// console.log('list=', list)
			// reply.send('list')
		},
		schema: {
			querystring: {
				id: {type: 'number'}
			}
		},
	}
]
