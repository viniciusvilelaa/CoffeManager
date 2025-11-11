import prisma from '../db.js'

//Create new Order
export async function createOrder(data) {
    
    //Checking if data is correct
    const { table, items } = data;
    if (!table || !Array.isArray(items) || items.length === 0) {
        throw new Error("Dados invalidos: forneca mesa e items validos");
    }

    //Creating new array with items order ids
    const productsId = items.map(i => i.productsId);

    //Creating array with products(name, price...)
    const products = await prisma.product.findMany({
        where: { id: { in: productsId } },
    });

    //Calculate total price
    let totalPrice = 0;
    
    //For each item in order data
    const orderItemsData = items.map(item => {
        
        //Find product with corresponding id
        const product = products.find(p => p.id === items.productId);

        //Check if product is valid
        if (!product) {
            throw new Error("Produto não encontrado no banco de dados");
        }

        //Calculate total price of this product
        let subtotal = product.price * item.quantity;

        //Sum this subtotal with total
        totalPrice += subtotal;

        return {
            productId: item.productId,
            quantity: item.quantity,
        };
    });

    //Creating the order
    const order = await prisma.order.create({
        data: {
            table,
            totalPrice,
            status: PREPARANDO,
            orderItems: {
                create: orderItemsData,
            },
        },
        include: {
            orderItems: {
                include: {product: true},
            },
        },
    });

    return order;
}

//Get all orders including your products
export async function getOrders(){
    const orders = await prisma.order.findMany({
        include: {
            orderItems: {include: {product: true}}
        },
        orderBy: {createdAt: "desc"}
    });

    return orders;
}

//Updating order status
export async function updateOrderStatus(id,status) {
    const validStatus = ["PREPARANDO", "DONE", "DELIVERED"];
    if ( !validStatus.includes(status)){
        throw new Error("Dado invalido: informe um status valido")
    }

    const updatedOrder = prisma.order.update({
        where: {id: Number(id)},
        data: {status},
        include: {
            orderItems: {
                include: {product: true}
            },
        },
    });

    return updatedOrder;
}