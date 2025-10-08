import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;// from front end user inpur
    const hashedPassword = await bcrypt.hash(password, 10);//Hashes the password with salt rounds = 10. 4 security
    const newUser = await User.create({ username, password_hash: hashedPassword, email, role });
    res.status(201).json({ message: 'User registered successfully', user: newUser });// response mesage
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password_hash);// compares to check kung tama
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    //res.json({ message: 'Login successful', user });
    // Generate JWT
    const token = jwt.sign(
      { user_id: user.user_id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );
    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { user_id: id } });
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
