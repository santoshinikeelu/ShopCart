const DB = require("../config");
/***************************************create category**************************/
const createCategories=  function(req, res)  {
   
    const data= req.body;
   
    DB.query("INSERT INTO category SET?",data, (err, results) => {
      
          if (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal Server Error' });
            return;
          }
            res.status(201).send({status:true,msg:"Data created successfully",results});
          });
   
  };

/***************************************get categories**************************/
 const getCategories = function(req, res) {
    DB.query('SELECT * FROM category', (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
        return;
      }
  
      res.status(200).send(results);
    });
  }

  /***************************************get categoriesByID**************************/
  const getCategoriesByID = function(req, res)  {
    const categoryId = req.params.id;
    
    DB.query('SELECT * FROM products WHERE id = ?', categoryId, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).send({ error: 'Category not found' });
        return;
      }
  
      res.status(200).send(results[0]);
    });
  }

  
/***************************************update categories**************************/
  const updateCategories = function(req, res)  {
    const categoryId = req.params.id;
    const { Name } = req.body;
  
    DB.query('UPDATE category SET Name = ? WHERE id = ?', [Name, categoryId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
        return;
      }
      res.status(200).send({status:true,msg:"update Data successfully"});
    });
  }
  
  
/***************************************Delete categories**************************/
  const deleteCategories = function(req, res)  {
    const categoryId = req.params.id;
  
   DB.query('DELETE FROM category WHERE id = ?', categoryId, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
        return;
      }
  
      res.status(200).send({status:true,msg:"Delete successfully"});
    });
  }

module.exports={createCategories,getCategories,getCategoriesByID,updateCategories,deleteCategories}
  
  
  

