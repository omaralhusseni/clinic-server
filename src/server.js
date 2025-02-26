//* IMPORTS *//
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const registrationRouter = require("./routes/registrationRoutes");
const adminRouter = require("./routes/adminRoutes");
const patientRouter = require("./routes/patientRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const Patient = require("./models/Patient");

//* SETUP *//
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 6000;

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.on("error", () => {
    console.log("Failed to connect to database");
});
db.once("open", () => {
    console.log("Connected to database succefully");
});

//* APP *//
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
    res.status(200).send("Welcome!");
});

app.use("/register", registrationRouter);
app.use("/admin", adminRouter);
app.use("/doctor", doctorRouter);
app.use("/patient", patientRouter);

app.post("/newPatient", async (req, res) => {
    req.body.username;
    const patient = new Patient();
    await patient.save();
    res.status(200).send("saved success");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}...`);
});
