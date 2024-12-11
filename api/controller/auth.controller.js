import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// signup controller
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
    next(error);
    console.log("error", error);
  }
};

// signup controller
export const signin = async (req, res, next) => {
  const { username, password } = req?.body;
  try {
    const userExist = await User.findOne({ username });
    if (!userExist) {
      return res.status(404).json({ error: "Invalid Credentials!" });
    }
    const validPassword = bcryptjs.compareSync(password, userExist.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid Credentials!" });
    }
    const token = jwt.sign({ id: userExist.id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = userExist._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        // expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log("error", error);
    next(error.mess);
  }
};

// googl
export const google = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET);
      // const { password: pass, ...rest } = userExists._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          // expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json({ message: "Logged in successfully!" });
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username: req.body.user,
        email: req.body.email,
        password: hashPassword,
        avatar: req.body.photoURL,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          // expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json({ message: "User registered successfully!" });
    }
  } catch (error) {
    console.log(error, "the error");

    next(error);
  }
};
