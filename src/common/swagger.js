const { 
  listen: { port, ip },
  swagger
} = require('./config')
const path = require('path')

module.exports = (fastify) => {
  if (!swagger.use) return;
  fastify.register(require('fastify-swagger'), {
    routePrefix: swagger.route,
    exposeRoute: true,
    swagger: {
      info: swagger.info,
      host: swagger.host === 'auto' ? ip : swagger.host,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        apiKey: swagger.apiKey
      }
    }
  })

  global.add_jump([
    swagger.route, 
		`${swagger.route}/json`,
		`${swagger.route}/static/index.html`,
		`${swagger.route}/static/swagger-ui.css`,
		`${swagger.route}/static/swagger-ui.css.map`,
		`${swagger.route}/static/swagger-ui-bundle.js`,
		`${swagger.route}/static/swagger-ui-bundle.js.map`,
		`${swagger.route}/static/swagger-ui-standalone-preset.js`,
		`${swagger.route}/static/swagger-ui-standalone-preset.js.map`,
		`${swagger.route}/static/favicon-16x16.png`,
		`${swagger.route}/static/favicon-32x32.png`
  ])
  
  setTimeout(() => console.green(`swagger服务已启动: http://${ip}:${port}${swagger.route}`))
}