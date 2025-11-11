import prisma from '../db.js'

//Melhorar e entender melhor productservice
export async function createProduct(data){
    return await prisma.product.create({data});
};

export async function getProducts() {
    return await prisma.product.findMany();
};