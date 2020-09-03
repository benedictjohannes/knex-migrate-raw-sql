const fs = require('fs')
const { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT } = process.env

const errtext = `Some of environment variables aren't defined. \n Please create .env in accordance to env.example`
if (typeof DB_HOST !== 'string') throw errtext
if (typeof DB_DATABASE !== 'string') throw errtext
if (typeof DB_USER !== 'string') throw errtext
if (typeof DB_PASSWORD !== 'string') throw errtext
if (typeof DB_PORT !== 'string' && Number.isFinite(Number(DB_PORT))) throw errtext

const conn_host = DB_HOST
const conn_database = DB_DATABASE
const conn_user = DB_USER
const conn_password = DB_PASSWORD
const conn_port = DB_PORT

exports.getUpDownSql = filename => {
    try {
        let sqlUpPath = filename.replace('.js', '.up.sql')
        let sqlDownPath = filename.replace('.js', '.down.sql')
        let sqlUpContent = fs.readFileSync(sqlUpPath).toString()
        let sqlDownContent = fs.readFileSync(sqlDownPath).toString()
        return { up: sqlUpContent, down: sqlDownContent }
    } catch (e) {
        return null
    }
}

exports.conn = {
    client: 'pg',
    connection: {
        database: conn_database,
        user: conn_user,
        password: conn_password,
        host: conn_host,
        port: conn_port,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
    },
}
