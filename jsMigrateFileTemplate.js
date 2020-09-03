const {getUpDownSql} = require('../dbhelpers')
const {up, down} = getUpDownSql(__filename)

exports.up = knex => knex.raw(up)
exports.down = knex => knex.raw(down)
