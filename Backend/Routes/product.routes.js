import express from "express";
import { query } from "../database/connection.js";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../Controllers/product.controller.js";
const router = express.Router();

//get all products
router.get("/products", (req, res) => {
  query.execute(`select * from products`, (err, data) => {
    getProducts(err, data, res);
  });
});

//add product

router.post("/products", (req, res) => {
  let prodNames = [];
  query.execute(`select name from products`, (err, data) => {
    prodNames = [...data];
    const { name, desc, price } = req.body;
    const isExist = prodNames.find((ele) => ele.name.toLowerCase() == name.toLowerCase());
    if (isExist) {
      return  res.json({ message: "error", err: "Product already exist" });
  
    } else {
      query.execute(
        `insert into products (name ,description,price) values ('${name}' , '${desc}','${price}')`,
        (err, data) => {
          addProduct(err, data, res);
        }
      );
    }
  });
 
});

//update product
router.put("/products", (req, res) => {
  const { id, name, desc, price } = req.body;
  query.execute(
    `update products set name ='${name}' , description= '${desc}', price ='${price}' where id =${id}`,
    (err, data) => {
      updateProduct(err, data, res,query,id);
    }
  );
});

//delete product
router.delete("/products", (req, res) => {
  const { id } = req.body;
  query.execute(`delete from products where id = ${id}`, (err, data) => {
    deleteProduct(err, data, res);
  });
});

export default router;
