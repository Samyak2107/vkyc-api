require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require("express");
const mongoose = require("mongoose");
// const User = require("./models/user");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connection established with Mongo DB");
});

app.get("/", function (req, res) {
  res.send("Hello Samyak P");
});

// const userRoutes = require("./routes/users");
const contactRoutes = require("./routes/contacts");
// const contactRoutes = require("./routes/contacts");
// const brandenquiryRoutes = require("./routes/brandenquirys");

// app.use("/users", userRoutes, cors());
app.use("/contacts", contactRoutes, cors());
// app.use("/contacts", contactRoutes);
// app.use("/brandenquirys", brandenquiryRoutes);

// app.post("/test-login", async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .send({ error: "User with that email does not exist" });
//     }
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).send({ error: "Invalid email or password" });
//     } else {
//       res.send({
//         message: "User logged in successfully",
//         user: user,
//       });
//     }
//   } catch (err) {
//     return res.status(400).send("Somethig went wrong");
//   }
// });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
