import chalk from "chalk";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import postsRoutes from './routes/postsRoutes.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(postsRoutes)
const port = process.env.PORT ?? 5000;

app.listen(port, () => {
  console.log(chalk.bgBlack.cyan(`Server running in port: ${port}`));
});
