// 赋予静态路径权限
global.add_jump(['/public/doc'])

// 在swagger地址 explore /public/doc

module.exports = (fastify) => [
    {
      method: 'GET',
      url: '/public/doc',
      handler: (req, reply) => {
            const json_9002doc = require('../../public/doc.json')
            reply.send(json_9002doc)
      }
    }
]