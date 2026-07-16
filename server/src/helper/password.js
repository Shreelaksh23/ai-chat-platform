import bcrypt from "bcrypt";
const SALT_ROUND=12;

//hash user password
export const hashPassword=async(password)=>{
    return await bcrypt.hash(password,SALT_ROUND);
};

//compare entered password with hashed password
export const comparePassword=async(password,hashPassword)=>{
    return await bcrypt.compare(password,hashPassword);
};