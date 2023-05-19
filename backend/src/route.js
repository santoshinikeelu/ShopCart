const express = require("express");
const router = express.Router();
const categryController = require('./controllers/categoryController')
const productController = require('./controllers/productControllers')

/***************************************create category**************************/
router.post("/category",categryController.createCategories)
  
// /***************************************get categories**************************/
   router.get('/categories',categryController.getCategories)

//   /***************************************get categoriesByID**************************/
  router.get('/categories/:id',categryController.getCategoriesByID) 
  
// /***************************************update categories**************************/
 router.put('/categories/:id',categryController.updateCategories) 

// ***************************************Delete categories**************************/
 router.delete('/categories/:id',categryController.deleteCategories)

// ***************************************create product**************************/
router.post("/products",productController.createProducts)

// /*****************************getproducts***************************************/
 router.get("/products", productController.getProducts)
 
// /***************************************get productsById**************************/
router.get('/products/:id',productController.getProductById)

// /*************************update products**************************************/
 router.put("/products/:id",productController.updateProducts)

// /***********************************delete products****************************/
router.delete("/products/:id",productController.deleteProducts)


module.exports = router;
