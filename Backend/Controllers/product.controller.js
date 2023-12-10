//get all products
export const getProducts = (err, data, res) => {
  if (err) {
    return res.json({ message: "error", err });
  } else {
    return res.json({ message: "success", data });
  }
};

//add product

export const addProduct = (err, data, res) => {
  if (err) {
    return res.json({ message: "error", err });
  } else if (data.affectedRows == 1) {
    return res.json({ message: "success" });
  }
};

//update product
export const updateProduct = (err, data, res, query, id) => {
  query.execute(`select id from products`, (err, data) => {
    let prodIDs = [...data];
    let isExist = prodIDs.find((ele) => ele.id === id);
    if (err) {
      return res.json({ message: "error", err });
    } else if (isExist) {
      return res.json({ message: "success" });
    } else {
      return res.json({ message: "error", err: "product is not exist" });
    }
  });
};

//delete product
export const deleteProduct = (err, data, res) => {
  if (err) {
    return res.json({ message: "error", err });
  }

  if (data && data.affectedRows > 0) {
    return res.json({ message: "success" });
  } else {
    return res.json({ message: "error", err: "Product not found" });
  }
};
