import express from "express";

import cors from "cors";

const app = express();

const port = 9000;

const BASE_URL = "http://localhost:9000";

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* app.use(express.static("public")); */

app.use(cors())

app.listen(port, () => {

    console.log(`Serveur sur: ${BASE_URL}`);

  });