const express = require("express");
const cors = require("cors");
const errorHandler = require("./errors/ErrorHandler")
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./routes/index");

const apiCall = require("./middleware/apiCall");
apiCall.scheduleCall();

app.use("/api", routes);
app.use(errorHandler);

module.exports = app;