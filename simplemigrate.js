const fs = require('fs')
const dayjs = require('dayjs')

dayjs().format('YYYYMMDDHHmmss')

20200803
132839

const ask = q =>
    new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        })
        readline.question(q, ans => {
            if (typeof ans != 'string') reject('Error: Answer not provided.')
            if (ans.match(/ /))
                reject('Error: migration name should not contain spaces')
            if (typeof ans.length < 3)
                reject('Error: Descriptive migration name should be provided')
            readline.close()
            return resolve(ans)
        })
    })

const main = async () => {
    let migrationDirPath = __dirname + '/migrations'
    if (!fs.existsSync(migrationDirPath)) {
        fs.mkdirSync(migrationDirPath)
    }
    let newMigrationName = await ask('New migration name: ')
    let newMigrationContent = fs.readFileSync(
        __dirname + '/jsMigrateFileTemplate.js'
    )
    let newMigrationBaseFilename =
        '/migrations/' +
        dayjs().format('YYYYMMDDHHmmss') +
        '_' +
        newMigrationName
    fs.writeFileSync(
        __dirname + newMigrationBaseFilename + '.js',
        newMigrationContent
    )
    fs.writeFileSync(__dirname + newMigrationBaseFilename + '.up.sql', `\n`)
    fs.writeFileSync(__dirname + newMigrationBaseFilename + '.down.sql', `\n`)
    console.log('Written files: ')
    console.log(newMigrationBaseFilename + '.js')
    console.log(newMigrationBaseFilename + '.up.sql')
    console.log(newMigrationBaseFilename + '.down.sql')
}

main()
