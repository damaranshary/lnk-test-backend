import LogHistory from "../model/logHistory.model.js";

const createLogging = async (obj) => {
  try {
    const logHistory = new LogHistory({
      email: obj.email,
      action: obj.action,
      timestamp: obj.timestamp,
    });

    console.log(obj)
    await logHistory.save();

    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default { createLogging };
