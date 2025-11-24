import * as userServices from "../services/userService.js"

// HTTP REQUEST POST
export const createUser = async (req, res) => {
    console.log(req.body);
    try{
        const user = await userServices.createUser(req.body);
        res.status(201).json(user);
    } catch(error){
        console.log("Error when creating user: ", error);
        res.status(500).json({ error: error.message })
    }
}

//HTTP REQUEST GET
export async function getUsers(req, res, next) {
    
    try{
        const users = await userServices.getUsers();
        res.json(users);
    }catch (err){
        next(err);
    }
}