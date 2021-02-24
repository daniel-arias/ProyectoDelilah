# Delilah Restó

It's the API backend escential for the daily base operation of a restaurant using NodeJs and JavaScript

## Motivation

The goal for the project is to emulate the tasks as  backend developer.

## Necessary Environment Variables

This variables should be set on the system environment or in a .env file of the project.

\* DB_USER - Database username\
\* DB_PASS - Database password\
\* DB_HOST - Database host\
\* DB_PORT - Database port\
\* DB_NAME - Database schema name\
\* HOST_PORT - Port where the server will be running\
\* HOST - Host URL where the server will be running\
\* key - Secret key for JWT authentication\

### Installation

Before starting you should run the **_npm-install_** command in the terminal at the project path.

After all the node modules get install without errors, the next command to run for the first time will be **_npm run start_db_** in order to create the Database.

Server could be run with the **_npm run start_** if you have nodemon package install or **_npm run server_** if not.

#### How to use?

First endpoint that must be use is the login. With this you wil get the token needed for all the other endpoints available.

##### Endpoints available for admin only

There are endpoints only available for user with **'admin'** rol, those will be:

\* DELETE users

\* GET products\
\* POST products\
\* PUT products\
\* DELETE products

\* POST pedidos\
\* PUT pedidos\
\* DELETE pedidos

#### Note

The _initDb.sql_ file have some initial records for the database, feel free to comment those insert lines if you do not desire to have this defautl data.

There is also a Postman collection (DelilahResto) for test puposes if you want to use it.
