module.exports = (fastify) => {
	console.green('开启异常处理...')
	
	fastify.setNotFoundHandler((request, reply)=>{
		console.red('try 404...')
		// console.log(request)
		// console.log(reply)
		reply.code(404).send()
	})
	
	fastify.setErrorHandler((error, reply)=>{
		console.red('try error...')
		// console.log(error)
		// console.log(reply)
		reply.code(500).send()
	})
}