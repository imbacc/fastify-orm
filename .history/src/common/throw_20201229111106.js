module.exports = (fastify, options, done) => {
	console.log('开启异常处理...')
	
	fastify.setNotFoundHandler((request, reply)=>{
		console.log('try 404...')
		// console.log(request)
		// console.log(reply)
		reply.code(404).send()
	})
	
	fastify.setErrorHandler((error, reply)=>{
		console.log('try error...')
		// console.log(error)
		// console.log(reply)
		reply.code(500).send()
	})

	console.log("fastify.reguse=", fastify.reguse)

	done()
}