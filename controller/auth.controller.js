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

    const token = await user.generateAuthToken();

    res.status(201).send({
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);

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
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(400).send(err);
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
      message: "Logged out",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { register, login, logout };
