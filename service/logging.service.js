import LogHistory from "../model/logHistory.model.js";

const createLogging = async (obj) => {
  try {
    const logHistory = new LogHistory({
      email: obj.email,
      action: obj.action,
      timestamp: obj.timestamp,
    });

    await logHistory.save();
  } catch (error) {
    console.log(error);
  }
};

export default { createLogging };
