import * as orderService from "../services/orderService.js"

//HTTP REQUEST POST

export const createOrder = async (req, res) => {
    console.log("DEBUG BODY:", req.body);
    
    try {
        const order = await orderService.createOrder(req.body)
        res.status(201).json(order);
    } catch (error) {
        console.log("Erro ao criar order: ", error);
        res.status(500).json({ error: error.message })
    }
};

//HTTP REQUEST GET
export const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        res.json(orders);
    } catch (error) {
        console.log("Erro ao tentar listar orders", error);
        res.status(500).json({ error: error.message });
    }
};

//HTTP REQUEST UPDATE
export const updateStatus = async (req, res) => {
    const  id  = parseInt(req.params.id);
    const { status } = req.body;

    try {
        const updatedOrder = await orderService.updateOrderStatus(id, status);
        res.status(201).json(updatedOrder);
    } catch (error) {
        console.log("Erro ao tentar alterar status de order", error);
        res.status(500).json({ error: error.message });
    }

}