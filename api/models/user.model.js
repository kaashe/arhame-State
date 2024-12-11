import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/a/ACg8ocIzfvd8719dc1fXIRhkryKNahP1i0Bc4_Ma6E-nmxmFjw-dWQ=s96-c",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
