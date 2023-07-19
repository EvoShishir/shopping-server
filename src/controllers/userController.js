const User = require("../models/userModel");

const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = createUser;
exports.getUsers = getUsers;
