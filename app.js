import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route.js";
import emailRoute from "./routes/email.route.js";

try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("connected to db");
} catch (error) {
  handleError(error);
}
process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/email", emailRoute)

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.listen(process.env.PORT || 8080, function () {
  console.log("App running on port" + process.env.PORT);
});
