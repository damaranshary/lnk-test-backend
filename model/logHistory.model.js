import mongoose from "mongoose";

const logHistorySchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    lowercase: true,
  },
  action: {
    type: String,
    require: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const LogHistory = mongoose.model("LogHistory", logHistorySchema);

export default LogHistory;
