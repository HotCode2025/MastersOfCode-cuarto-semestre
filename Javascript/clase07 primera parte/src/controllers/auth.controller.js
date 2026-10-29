import {pool} from "../db.js"
import bcrypt from "bcrypt";
import {createAccesToken} from "../libs/jwt.js"; "../libs/jwt.js"

export const signin = (req, res) => res.send("ingresando");

export const signup = async(req, res) => {
    const {name , email, password} = req.body;
    console.log(name, email, password)
    res.send("Registrando");

try {

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const result = await pool.query("INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3)", [Name, email, hashedPassword])
    
    const token = await createAccesToken({id: result.rows[0].id})
    console.log(result);
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 60 * 60 * 24 * 1000,}) // 1 day})c

    //return res.json(result.rows[0]);
    resturn.res.json({
        token: token,
    });
} catch (error) {
    if(error.code === "23505"){
        return res.status(400).json({message: "El correo ya esta registrado"})
    }

}
 
};

export const signout =(req, res) => res.send("Cerrando sesion")

export const profile = (req, res) => res.send("Perfil del usuario")