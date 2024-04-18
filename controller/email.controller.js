import EmailData from "../model/email.model.js";
import User from "../model/user.model.js";

const sendEmail = async (req, res) => {
  const sender = req.user.email;
  try {
    const { recipient, subject, description } = req.body;

    const isRecepientExists = await User.findOne({
      email: recipient,
    });

    if (!isRecepientExists) {
      throw new Error("Recipient email not found");
    }

    const emailData = new EmailData({
      sender,
      recipient,
      subject,
      description,
    });

    await emailData.save();

    res
      .status(200)
      .send({ status: "success", message: "Email sent successfully" });
  } catch (err) {
    res.status(400).send({ status: "failed", message: err.message });
  }
};

const getInboxEmail = async (req, res) => {
  try {
    const inbox = await EmailData.find({ recipient: req.user.email }).sort({
      timestamp: "desc",
    });

    res
      .status(200)
      .send({
        status: "success",
        data: inbox,
        message: "Get Inbox successfully",
      });
  } catch (err) {
    res.status(400).send({ status: "failed", message: err.message });
  }
};

const getSentEmail = async (req, res) => {
  try {
    const sent = await EmailData.find({ sender: req.user.email }).sort({
      timestamp: "desc",
    });

    res.status(200).send({ status: "success", data: sent });
  } catch (err) {
    res
      .status(400)
      .send({
        status: "failed",
        message: err.message,
        message: "Get Sent Email successfully",
      });
  }
};

export default { sendEmail, getInboxEmail, getSentEmail };
