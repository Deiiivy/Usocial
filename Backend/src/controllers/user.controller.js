import userService from '../services/user.service.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userService.createUser({ name, email, password:hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};


export const loginUSer = async(req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    console.log(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.json({ message: 'Inicio de sesión exitoso', user, token });
  }catch(error) {
    next(error);
  }
}