import * as userServices from '../services/productService'

// HTTP REQUEST POST
export const createUser = async (res, req) => {
    try{
        const user = await userServices.createProduct(req.body);
        res.status(201).json(user);
    } catch(error){
        console.log("Erro ao criar order: ", error);
        res.status(500).json({ error: error.message })
    }
}

//HTTP REQUEST GET
export const getUsers = async (res, req) => {
    try {
        const users = await userServices.getProducts();
        res.json(users);
    } catch (error) {
        console.log("Error when listing users");
        res.status(500).json({error: error.message});
    }
}