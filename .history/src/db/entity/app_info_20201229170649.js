const defaultList = [
    { 
        id: 1,
        text: '1.修复爱奇艺和腾讯搜索抓取错误\\n 2.播放白屏问题',
        version: 100,
        os: 1,
        ostext: '安卓',
        linkurl: 'http://xxxxx/download/capp-2019-2-12.apk'
    },
    { 
        id: 2,
        text: '1.修复爱奇艺和腾讯搜索抓取错误\\n 2.播放白屏问题',
        version: 100,
        os: 2,
        ostext: '苹果',
        linkurl: 'http://xxxxx/download/capp-2019-2-12.apk'
    },
    { 
        id: 3,
        text: '1.修复爱奇艺和腾讯搜索抓取错误\\n 2.播放白屏问题',
        version: 100,
        os: 3,
        ostext: '网页下载',
        linkurl: 'http://xxxxx/download/capp-2019-2-12.apk'
    }
]

module.exports = (sequelize, DataTypes) => {
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
    entity.sync()
    // defaultList.forEach(info => entity.create(info))
    return entity
}
