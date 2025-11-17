import * as productService from "../services/productService.js"

//HTTP REQUEST POST
export const createProduct = async (req, res) => {

  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: error.message });
  }
};


//HTPP REQUEST GET
export async function getProducts(req, res, next) {
    //Trying return all products using product services getProduct
    try{
        const products = await productService.getProducts();
        res.json(products);
    }catch (err){
        next(err);
    }
}


//HTTP REQUEST UPDATE
export const updateProduct = async (req, res) => {
    const  id  = parseInt(req.params.id);
    const data = req.body;

    try{
      const updatedProduct = await productService.updateProduct(id, data);
      res.status(201).json(updatedProduct);
    } catch (error){
      console.log("Error when updating product", error);
      res.status(500).json({ error: error.message });
    }


}

