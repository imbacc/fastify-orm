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
    }
})

const path = `./src/db/entity`
fs.readdirSync(path).map((fileName) => db[fileName] = sequelize.import(`./entity/${fileName}`))

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});