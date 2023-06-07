import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const getUsers = async (req, res) => {
  const { role } = req.query;

  //get users where role is role
  let users = await User.find({ role });

  res.status(StatusCodes.OK).json(
    users.map((user) => {
      return {
        userId: user._id,
        name: user.name + " " + user.lastName,
        email: user.email,
      };
    })
  );
};

const updateUser = async (req, res) => {
  const { email, name, lastName } = req.body;

  if (!name || !email || !lastName) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.name = name;
  user.lastName = lastName;
  user.email = email;

  await user.save();

  res.status(StatusCodes.OK).json({ user });
};

export { getUsers, updateUser };
