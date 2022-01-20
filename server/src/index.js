const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { db } = require("./model/dbConnection");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Buana Store API Server.",
  });
});

// get all products item
app.get("/products/get", (req, res) => {
  const sqlQuery = "SELECT * FROM products";
  db.query(sqlQuery, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// add products item
app.post("/products/add", (req, res) => {
  const productsObj = {
    name: req.body.name,
    size: req.body.size,
    price: req.body.price,
    discount: req.body.discount,
    code: req.body.code,
    tag: req.body.tag,
    description: req.body.description,
    wishlist: req.body.wishlist,
    cart: req.body.cart,
  };

  const sqlQuery =
    "INSERT INTO products (name, size, price, discount, code, tag, description, wishlist, cart) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sqlQuery,
    [
      productsObj.name,
      productsObj.size,
      productsObj.price,
      productsObj.discount,
      productsObj.code,
      productsObj.tag,
      productsObj.description,
      productsObj.wishlist,
      productsObj.cart,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server is listening on http://localhost:3001");
});
