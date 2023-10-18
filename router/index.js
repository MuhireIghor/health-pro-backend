const express = require("express");
const patientRoute = require("./patient.route");
const recordRoute = require("../router/records.router")
const app = express();

app.use("/patients",patientRoute);
app.use("/records",recordRoute)
module.exports = app;