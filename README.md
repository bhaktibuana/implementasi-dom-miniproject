# buana-store-project
Buana Store is a mini-project from Dibimbing course that I have built in the form of a e-commerce website.
This project is built with [Bootstrap](https://getbootstrap.com/) and [ReactJs](https://reactjs.org/) framework on the client side, [ExpressJs](https://www.npmjs.com/package/express) framework on the server side, and MySQL Database as the database.

## Installation
- Open **./server** directory and run `npm install` on your terminal.
- Open **./client** directory and run `npm install` on your terminal.

###### Database configuration
- Import **./buana_store_db.sql** file into your MySQL Database.
- Open **dbConnection.js** in the **./server/src/model/** directory and you will see the following code:
```javascript
const mysql = require("mysql");

const db = mysql.createPool({
  host: "YOUR_MYSQL_HOST", // "localhost" by default
  user: "YOUR_MYSQL_USER", // "root" by default
  password: "YOUR_MYSQL_PASSWORD",
  database: "buana_store_db",
});

exports.db = db;
```
Change value of **host**, **user** and **password** to your MySQL configuration.

## Run the app
- Open **./server** directory and run `npm start` on your terminal.
- Open **./client** directory and run `npm start` on your terminal.
- Open your favourite web browser and open [http://localhost:3000](http://localhost:3000). Enjoy!

I hope you guys like this project :grin:
