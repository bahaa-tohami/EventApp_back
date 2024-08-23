import express from "express";
import sequelize from "./config/database.js";
import initDB from "./config/initDb.js";
import cors from "cors";
import dotenv from "dotenv";
import seedDatabase from "./config/seed.js";
import userRouter from "./routes/userRoute.js";
import bodyParser from "body-parser";
import eventRouter from "./routes/eventRoute.js";
dotenv.config();

const app = express();

const port = process.env.PORT;

const BASE_URL = "http://localhost:9000";

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

/* app.use(express.static("public")); */

app.use(cors())
// inti db
initDB();
app.use("/", userRouter)
app.use("/event", eventRouter)
// Vérification de la connexion


app.listen(port, () => {

    console.log(`Serveur sur: ${BASE_URL}`);

  });