import chalk from "chalk";
import express from "express";

const app = express();

const port = process.env.PORT ?? 5000;

app.listen(() => {
  console.log(chalk.bgBlack.cyan(`Server running in port: ${port}`));
});
