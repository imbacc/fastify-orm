module.exports = (sequelize, DataTypes) => {
    return sequelize.define('app_info', {
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
}
