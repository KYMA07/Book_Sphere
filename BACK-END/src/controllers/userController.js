import User from '../models/userModel.js';
import Student from '../models/studentModel.js'; // used to verify student email
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body; // from front end user input

    // If registering as Student, verify email exists in students table
    if (role === 'Student') {
      const student = await Student.findOne({ where: { email } });
      if (!student) {
        return res.status(403).json({ message: 'Email not found in student records' }); // prevents unauthorized student registration
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hashes the password with salt rounds = 10. 4 security
    const newUser = await User.create({ username, password_hash: hashedPassword, email, role }); // role: 'Staff' or 'Student'
    res.status(201).json({ message: 'User registered successfully', user: newUser }); // response message
  } catch (error) {
    console.error(' Registration error:', error);
    res.status(500).json({ error: error.message, details: error.errors });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password_hash); // compares to check kung tama
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    // Generate JWT
    const token = jwt.sign(
      { user_id: user.user_id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret', // fallback secret if env var missing
      { expiresIn: '1h' } // token expires in 1 hour
    );
    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // gets all users from the database
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { user_id: id } }); // deletes user by ID
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};