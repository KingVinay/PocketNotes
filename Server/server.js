const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

const cors = require("cors");
app.use(cors());

// express parser
app.use(express.json());

const groupRoute = require("./Routes/group");

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log("DB Failed to Connect!", err));

app.get("/api/health", (req, res) => {
  console.log("hey health!");
  res.json({
    service: "Pocket Notes Server",
    status: "active",
    time: new Date(),
  });
});

app.use("/api/group", groupRoute);

// Middleware for Error
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ errorMessage: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`PocketNotes Server is running on port ${PORT}`);
});
