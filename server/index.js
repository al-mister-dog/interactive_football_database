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
app.use(errorHandler)
// if (process.env.NODE_ENV === "production") {
//   // Static folder
//   app.use(express.static(__dirname + "/public/"));

//   // Handle SPA
//   app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
// }

const PORT = process.env.PORT || 4000;

app.listen(PORT);
