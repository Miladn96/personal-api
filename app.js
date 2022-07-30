const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { routerAbout, routerAdmin } = require("./routes");
const { PORT, APP_MODE } = require("./utils");

// const sequelize = require("./utils/database");

//? cors initialise
const cors = require("cors");
app.use(cors());
//? end cors

//? start body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));
app.use("/", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});
//? end body-parser

//? start routes
app.use("/api/admin", routerAdmin);
app.use("/api/about", routerAbout);
//? end routes

//? app listen
switch (APP_MODE) {
  case "DEVELOPMENT":
    app.listen(PORT || 3000, () => {
      console.log(`App running on port: ${PORT || 3000}`);
    });
    break;
  case "PRODUCTION":
    app.listen();
    break;
}
