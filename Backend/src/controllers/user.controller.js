import userService from '../services/user.service.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

export const getUsers = async (req, res, next) => {
  try {
    const getUsers = await userService.getAllUsers();
    console.log(getUsers);
    res.json(getUsers);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const image = req.file ? `uploads/${req.file.filename}` : null;
    const newUser = await userService.createUser({ name, email, password:hashedPassword, image });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    next(error);
  }
};


export const getCurrentUser = async (req, res, next) => {
  console.log('req.userId en getCurrentUser:', req.userId); 
  try {
      const user = await userService.getUserById(req.userId);
      if (!user) {
          console.log('No se encontró el usuario con id:', req.userId);
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error('Error en getCurrentUser:', error);
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