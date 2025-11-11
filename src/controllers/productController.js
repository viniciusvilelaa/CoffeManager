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

