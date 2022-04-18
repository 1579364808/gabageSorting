
const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();
const multiple= db.collection('multiple')
const _ = db.command


exports.main = async (event) => {
    return await multiple
        .aggregate()
        .match({
            onlyId: _.in(event)
        })
        .project({
            _id: 0,
            _openId: 0,
        })
        .end()
}