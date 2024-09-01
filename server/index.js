const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51PcBzhD8vdk9FbZFvLQw57iFR23ZC6RaDt2eQibCe0Ny8u9jH02X1GWfFL0mzc3C9aQqXDEvpzAOEKcq2ywW0Ymm00pF3sElvn"
);
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//mongodb connect
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDb"))
  .catch((e) => console.log(e.message));

//schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

app.post("/data", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/api/user", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/success", (req, res) => {
  res.send("Payment successfully completed");
});

app.get("/cancel", (req, res) => {
  res.send("Payment failed");
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/payment", async (req, res) => {
  const { amount } = req.body;
  const product = await stripe.products.create({
    name: "T-Shirt",
  });

  if (product) {
    var price = await stripe.prices.create({
      product: `${product.id}`,
      unit_amount: amount * 100,
      currency: "inr",
    });
  }

  if (price.id) {
    var session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: `${price.id}`,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://staging.d7serr4pzaiv6.amplifyapp.com/success",
      cancel_url: "https://staging.d7serr4pzaiv6.amplifyapp.com/success",
      customer_email: "demo@gmail.com",
    });
  }

  res.json(session);
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
