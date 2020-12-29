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

// const path = './src/db/entity'
// fs.readdirSync(path).map((fileName) => require(`./entity/${fileName}`))

const entity = sequelize.define('app_info', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true
    },
    text: DataTypes.STRING(200),
    version: DataTypes.INTEGER(11),
    os: DataTypes.INTEGER(1),
    ostext: DataTypes.STRING(5),
    linkurl: DataTypes.STRING(300)
}, {
    timestamps: false
})

sequelize.imports(entity)

module.exports = (fastify) => {
    fastify.decorate('exec', sequelize)
}