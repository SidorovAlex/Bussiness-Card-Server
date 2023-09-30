const express = require("express");
const app = express();
const chalk = require("chalk");
const router = require("./router/router");
const { handleError } = require("./utils/errorHandler");
const cors = require("./cors/cors");
const logger = require("./logger/loggerAdaptor");
const connectToDb = require("./db/dbService");
const config = require("config");
const {
  generateInitialCards,
  generateInitialUsers,
} = require("./initialData/initialDataService");

app.use(logger);
app.use(cors);
app.use(express.json());
app.use(express.text());
app.use(express.static("./public"));
app.use(router);

app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});

const PORT = config.get("PORT");
const HOST = config.get("HOST");
app.listen(PORT, () => {
  console.log(chalk.blueBright(`listening to http://${HOST}:${PORT}`));
  connectToDb();
  generateInitialCards();
  generateInitialUsers();
});
