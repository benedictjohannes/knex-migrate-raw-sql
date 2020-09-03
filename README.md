# Prelude: What's this?

This an (overly) simple project meant to help you use the excellent [KnexJS](http://knexjs.org/)'s migration tool, _without any_ familiarity with Javascript programming.  
Knex's migration was designed to use Knex's `schema`, which requires Javascript familiarity to construct DDL via the Knex query builder, like `db.schema.createTableIfNotExists(_._._)`, which only JS developers can do with.

However, `up` and `down` promises expected for each migrations are simply functions that can execute any Knex functions, including `db.raw`.  
With it, "raw" SQL statements can be written in separate files, that can be read back to be executed by `db.raw`.

This repository is _not_ meant to be a starting point of _your_ project (or its migration handler). Instead, it aims to quickly create a migration folder directory, that can easily be used by people familiar with SQL but foreign to NodeJS / Javascript development. For now, this repo is geared for PostgreSQL.  
If you're a NodeJS developer, the `getUpDownSql` function inside `./dbhelpers.js` might be what you're looking for.

# Using


## configure .env

Create a file named `.env` in the root folder of the project to setup database connection.  
The template for `.env` file can be viewed in `env.example`.

Needless to say, you'll need to set the connection with database user with enough database privileges to perform migrations (DDLs).

## Install NodeJS

If it's not installed, install [NodeJS](https://nodejs.org). This repo is developed with NodeJS 12.

## run `npm install`

As with any other NodeJS, run `npm install` to fetch all dependencies.

## migrations location

Your migrations file would be stored in `migrations` folder.

## `npm run simplemigrate`

When ran inside a terminal, you'll be asked the migration name, which will be appended to the current timestamp to create a new migration file

## `npm run knex migrate:make`


This is the vanilla KnexJS migration.  
If you're using this repo, you'd likely not need this command.

The difference with `simplemigrate`: You're given a new JS-only migration file, which is used to perform migrations the KnexJS/Javascript. 

## `npm run knex migrate:status`

This command will let you know your current migration status

## `npm run knex migrate:up`

This will run one migration newer than the database's current migration status (upgrade one step).

## `npm run knex migrate:down`

This will cancel the last migration performed on the database (downgrade one step).

## `npm run knex migrate:latest`

This will run any newer migration than the current migration step the database is in (upgrade to newest).

## `npm run knex migrate:rollback`

This will cancel the last migration action (undo last migration action - which can be multiple steps if ran using `migrate:latest`).
