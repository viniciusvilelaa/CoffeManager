import prisma from '../db.js'

//Creating new product
export async function createProduct(data){
    return await prisma.product.create({data});
};

//Get all products
export async function getProducts() {
    return await prisma.product.findMany();
};

//Update product
export async function updateProduct(id, ){
    //Verify product id
    const productId = Number(id);
    
    if (!productId){
        throw new Error("Provide valid product id");
    }


    //Verify data
    if (!data){
        throw new Error("Provide updated data for product")
    }

    //Permited fields
    const allowedFields = ["name", "price", "category"];

    //Filtering to only allowedData
    const filteredData = {};
    for ( const key of allowedFields){
        if(data[key] !== undefined ){
            filteredData[key] = data[key]
        }
    }


    //Verify if product exists
    const existingProduct = await prsima.product.findUnique({
        where: {id: productId },
    });

    if (!existingProduct){
        throw new Error("Product with this id not found")
    }

    //Update
    const updatedProduct = await prisma.product.update({
        where: {id: productId},
        data: filteredData,
    });
    
    return updatedProduct;
}