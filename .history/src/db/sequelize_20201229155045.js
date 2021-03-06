const fs = require('fs')
const { Sequelize, DataTypes } = require("sequelize")
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
    console.green('数据库连接成功...')
} catch (error) {
    console.red('数据库连接失败', error)
}

const path = './src/db/entity'
fs.readdirSync(path).map((fileName) => require(`./entity/${fileName}`))

module.exports = (fastify) => {
    fastify.decorate('exec', sequelize)
}