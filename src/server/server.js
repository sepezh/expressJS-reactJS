import { MongoClient } from "mongodb";
import path from "path";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect-db";
import "./initialize-db";
import { authenticationRoute } from "./authenticate";
import { addNewTask, updateTask } from "./communicate-db";

let port = process.env.PORT || 7777;
let app = express();

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.listen(port, console.info("Server running, listening on port ", port));

authenticationRoute(app);

if (process.env.NODE_ENV == `production`) {
  app.use(express.static(path.resolve(__dirname, "../../dist")));
  app.get("/*", (request, response) => {
    response.sendFile(path.resolve("index.html"));
  });
}

app.post("/task/new", async (request, response) => {
  await addNewTask(request.body.task);
  response.status(200).send();
});

app.post("/task/update", async (request, response) => {
  let db = await connectDB();
  await updateTask(request.body.task);
  response.status(200).send();
});

app.post("/comment/new", async (request, response) => {
  let comment = request.body.comment;
  let db = await connectDB();
  let collection = db.collection(`comments`);
  await collection.insertOne(comment);
  response.status(200).send();
});
