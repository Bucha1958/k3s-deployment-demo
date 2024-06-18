import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserModal from '../models/user';
import { User } from '../types/products.types';

dotenv.config();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}

// User Registration

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password }: User = req.body;
// validation check
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required" });
    }

    try {
        // Check if the email is already registered
        const existingUser = await UserModal.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const userDoc = await UserModal.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: "Registered successfully", userDoc });
    } catch (error) {
        console.error("Error during user registration:", error); // Log the error
        res.status(500).json({ message: "Internal server error", error: (error as Error).message });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    const { email, password }: User = req.body;
  
    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
  
    try {
        const userDoc = await UserModal.findOne({ email });
  
      // Check if user document is found
        if (!userDoc) {
            return res.status(404).json({ message: "Email address does not exist" });
        }
  
        const passOk = await bcrypt.compare(password, userDoc.password);
  
        if (!passOk) {
            return res.status(401).json({ message: "Invalid password" });
        } else {
            jwt.sign({ id: userDoc._id, email: userDoc.email}, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id:userDoc._id,
                    email,
                });
            });
        }
  
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: (error as Error).message });
    }
};

export const profileUser = async (req: Request, res: Response) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) return res.status(401).json({ message: 'Unauthorized' });
      res.json(info);
    });
  };
  
  