const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect("mongodb+srv://arrog13:4111@cluster0.ylzzej0.mongodb.net/")
  .then(() => console.log(chalk.magentaBright("Connected to MongoDB Atlas!")))
  .catch((error) =>
    console.log(
      chalk.redBright.bold(`could not connect to mongoDB Atlas: ${error}`)
    )
  );
