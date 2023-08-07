const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");

const createUser = async (req, res, next) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      role: req.body.role?.toLowerCase(),
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select([
      "-role",
      "-password",
      "-createdAt",
      "-updatedAt",
    ]);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const updateMyProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    }).select(["-role", "-password", "-createdAt", "-updatedAt"]);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select(["-password", "-createdAt", "-updatedAt"]);
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
    const users = await User.find().select([
      "-password",
      "-createdAt",
      "-updatedAt",
    ]);
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid email or password.");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid email or password.");
    }

    const token = user.generateAuthToken();

    res.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    req.session.destroy();

    res.status(200).json({
      success: true,
      message: "User successfully logged out.",
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = createUser;
exports.updateUserRole = updateUserRole;
exports.getUsers = getUsers;
exports.loginUser = loginUser;
exports.getMyProfile = getMyProfile;
exports.updateMyProfile = updateMyProfile;
exports.logoutUser = logoutUser;
