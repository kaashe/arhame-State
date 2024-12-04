import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const singup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    // Input validation (optional but recommended)
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists!" }); // 409 is used if record already exists
    }
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res.status(201).json("User Created Successfully!");
  } catch (error) {
    // next(error);
    console.log("error", error);
  }
};
