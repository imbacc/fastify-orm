const fs = require('fs')
const path = require('path')
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

try {
    sequelize.authenticate()
    console.log('\x1B[32m Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}

// const path = './src/db/entity'
// fs.readdirSync(path).map((fileName) => {
//     console.log("fileName=", fileName)
//     //   sequelize.import(`./entity/${fileName}`)
//     db[fileName.replace('.js', '')] =  sequelize.import(__dirname + fileName)
// })

fs.readdirSync(__dirname).filter((file) => file !== 'index.js').forEach((file) => {
    const model = sequelize.import(path.join(__dirname), file)
    db[model.name] = model
})

console.log("db=", db)

module.exports = (fastify) => {
    fastify.decorate('sequelize', db)
}