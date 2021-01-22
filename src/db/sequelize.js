const fs = require('fs')
const { Sequelize, DataTypes } = require("sequelize")
const { mysql } = require('../common/config')

const db = {}

const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
    host: mysql.host,
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
fs.readdirSync(path).map((fileName) => {
    db[fileName.replace('.js', '')] = require(`./entity/${fileName}`)(sequelize, DataTypes)
})

if (mysql.createTable) {
    for (const info in db) {
        let entity = db[info]
        entity.sync()
    }
}

module.exports = (fastify) => {
    fastify.decorate('sequelize', sequelize)
    fastify.decorate('exec', db)
}