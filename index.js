import express from "express";
import sequelize from "./config/database.js";
import cors from "cors";
import dotenv from "dotenv";
import seedDatabase from "./config/seed.js";
import userRouter from "./routes/userRoute.js";
import guestRouter from "./routes/guestRoute.js";
import bodyParser from "body-parser";
import eventRouter from "./routes/eventRoute.js";
import commentRoutes from "./routes/commentRoute.js"
import adminRouter from "./routes/adminRoute.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

const BASE_URL = "http://localhost:9000";

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

/* app.use(express.static("public")); */

app.use(cors())

app.use("/", userRouter)
app.use("/", guestRouter)
app.use("/event", eventRouter)
app.use("/", commentRoutes)
app.use("/", adminRouter)



sequelize.sync()
  .then(() => {
    console.log("Les tables ont été créées avec succès avec suppression en cascade activée.");
    seedDatabase();  // insertion des données
  })
  .catch((error) => {
    console.error("Erreur lors de la synchronisation des modèles:", error);
  });

app.listen(port, () => {
    console.log(`Serveur sur: ${BASE_URL}`);
});