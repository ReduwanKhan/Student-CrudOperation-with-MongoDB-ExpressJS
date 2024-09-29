const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const router = require("./router/student.js");

const app = express();
const port = 5050;
const url = "mongodb://localhost:27017";
const dbName = "studentDB";

let db = null;

const connectToDB = async () => {
  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  console.log("Connected to MongoDB");
  return db;
};

app.use(bodyParser.json());
connectToDB()
  .then((database) => {
    app.use((req, res, next) => {
      req.db = database;
      next();
    });
    app.use("/api", router);
  })
  .catch((error) => {
    console.log("Failed To connect", error);
  });

app.listen(port, () => {
  console.log("Server listening on port ", port);
});
