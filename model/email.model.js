import mongoose from "mongoose";

const emailDataSchema = new mongoose.Schema({
  sender: {
    type: String,
    require: true,
    lowercase: true,
  },
  recipient: {
    type: String,
    require: true,
    lowercase: true,
  },
  subject: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const EmailData = mongoose.model("EmailData", emailDataSchema);

export default EmailData;
