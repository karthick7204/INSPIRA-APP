import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save(); 

        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName, 
            email: newUser.email,
        });

    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async(req, res) => {
   const {email,password } = req.body
   try{
    const user = await user.findOne({email})

    if(!user) {
        return res.status(400).json({message:"invalid credentials"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({message:"invalid credentials"})
    }
    generateToken(user._id,res)

    res.status(200).json({ //send user data back to client
         _id:user._id,
         fullName:user.fullName,
         email: user.email,
         profilePic: user.profilePic,
    })
   }catch (error) {
    console.log("error in login controller",error.message);
    res.status(500).json({message:"internal error"})
   }
};

export const logout = async(req, res) => {
   try{
      res.cookie("jwt", "",{maxAge:0})
      res.status(200).json({message:"logged out successfully"});
   }catch(error){
      console.log("error in logout controller",error.message);
   }
};
