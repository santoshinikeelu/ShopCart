const DB = require("../config");

/***************************************create product**************************/
const createProducts = function (req, res) {
    const { productName, categoryId } = req.body;
  DB.query('INSERT INTO products (productName, categoryId) VALUES (?, ?)', [productName, categoryId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Internal Server Error" });
      return;
    }
    res
      .status(201)
      .send({ status: true, msg: "Data created successfully", results });
  });
};

/*****************************getproducts***************************************/
const getProducts = function (req, res) {
  const { offset, limit } = req.query;

  DB.query(
    "SELECT p.*, c.name AS categoryName FROM products p INNER JOIN category c ON p.categoryId = c.id LIMIT ?, ?",
    [parseInt(offset), parseInt(limit)],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
        return;
      }
      if (result.length === 0) {
        res.status(404).send({ error: "Product not found" });
        return;
      }

      res.status(200).send(result);
    }
  );
};

const getProductById = function (req, res) {
  const productId = req.params.id;

  DB.query(
    "SELECT p.*, c.name AS categoryName FROM products p INNER JOIN category c ON p.categoryId = c.id WHERE p.id = ?",
    productId,
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
        return;
      }

      if (results.length === 0) {
        res.status(404).send({ error: "product not found" });
        return;
      }

      res.status(200).send(results[0]);
    }
  );
};

/*************************update products**************************************/
const updateProducts = function (req, res) {
    const productId = req.params.id;
    const { productName, categoryId } = req.body;
  DB.query(
    'UPDATE products SET productName = ?, categoryId = ? WHERE id = ?', [productName, categoryId, productId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
        return;
      }
      res
        .status(200)
        .send({ status: true, msg: "update Data Successfully", results });
    }
  );
};

/***********************************delete products****************************/
const deleteProducts = function (req, res) {
  const productId = req.params.id;
  DB.query("DELETE FROM products WHERE id = ?", productId, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Internal Server Error" });
      return;
    }
    res.status(200).send({ status: true, msg: "Deleted Data successfully" });
  });
};

module.exports = {
  createProducts,
  getProducts,
  getProductById,
  updateProducts,
  deleteProducts,
};
