import prisma from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

//CREATE USER
export async function createUser(data){
    //Creating variables with data
    const { name, email, password} = data;

    //Check if data is correct
    if ( !name || !email || !password){
        throw new Error("Provide a valid name, email and password");
    }

    //Verify if already have other user with privided email
    const uniqueUser = await prisma.user.findUnique({
        where: { email },
    });

    if(uniqueUser){
        throw new Error("E-mail already exists please try another");
    }

    //Hashing the password with bcrypt
    const passwordHashed = await bcrypt.hash(password, 10);
    
    //Saving user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: passwordHashed
        }
    })



}

// GET ALL USERS
export async function getUsers(){
    return prisma.user.findMany();
}

export async function login(data){
    const {username, password} = data;

    const user = prisma.user.findUnique({
        where: {username: username}
    })

    if(!user){
        throw new Error("Please provide a valid username");
    }

    const isValidPassword = bcrypt.compare(password, User.password);

    if(!isValidPassword){
        throw new Error("Wrong password");
    }

   const token = jwt.sign(
    {id: user._id, role: user.role},
    JWT_SECRET,
    {expiresIn: "1d"}
   );

   return { user, token};
}