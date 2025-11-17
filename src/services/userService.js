import prisma from '../db.js'
import bcrypt from 'bcryptjs'

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