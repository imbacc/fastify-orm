const fs = require('fs')
const Sequelize = require('sequelize')
const config = require('../common/config').mysql
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone: '+08:00'
})

const path = './src/db/entity'
fs.readdirSync(path).map((fileName) => {
    console.log("fileName=", fileName)
    //   sequelize.import(`./entity/${fileName}`)
    db[fileName.replace('.js', '')] =  sequelize.import(__dirname + fileName)
})

console.log("db=", db)

module.exports = (fastify) => {
    fastify.decorate('sequelize', db)
}