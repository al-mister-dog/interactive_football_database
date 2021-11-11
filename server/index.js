const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./routes/index");
const apiCall = require("./middleware/apiCall");

apiCall.scheduleCall();

app.use("/api", routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT);
