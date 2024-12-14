import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const test = (req, res) => {
  res.json({
    message: "route is working!",
  });
};

// steps in update
// 1. if user is authenticated or'nt

export const updateUser = async (req, res, next) => {
  const userId = req.user.id;
  const paramsId = req.params.id;

  if (userId !== paramsId) {
    return res.status(401).json({ error: "user not found!:upadteUser" });
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateuser = await User.findByIdAndUpdate(
      paramsId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.photoURL,
        },
      },
      { new: true }
    );
    const { password: pass, ...rest } = updateuser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
