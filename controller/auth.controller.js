import User from "../model/user.model.js";
import logging from "../service/logging.service.js";

const register = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    res.status(201).send({
      status: "success",
      message: "Registered successfully",
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    // creating timestamps everytime the user logged in
    const loggingResult = await logging.createLogging({
      email: user.email,
      action: "login",
      timestamp: new Date(),
    });

    if (loggingResult instanceof Error) {
      throw new Error("Logging failed");
    }

    res.send({
      status: "success",
      data: {
        name: user.name,
        email: user.email,
        accessToken: token,
      },
      message: "Logged in successfully",
    });
  } catch (err) {
    res.status(400).send({
      status: "failed",
      data: null,
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = [];

    // creating timestamps everytime the user logged out
    await logging.createLogging({
      email: req.user.email,
      action: "logout",
      timestamp: new Date(),
    });

    await req.user.save();
    res.send({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: "failed",
      message: err.message,
    });
  }
};

const getProfile = async (req, res) => {
  res.send({
    status: "success",
    data: {
      name: req.user.name,
      email: req.user.email,
    },
    message: "Get profile successfully",
  });
}

export default { register, login, logout, getProfile };
