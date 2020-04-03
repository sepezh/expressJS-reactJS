import express, { request, response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connect } from "mongodb";

let port = 7777;
let app = express();

app.listen(port, console.log("Server listening on port", port));

// app.get("/", (request, response) => {
//   response.send(" Hello world");
// });

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

export const addNewTask = async task => {
  let { id, geoup, isComplete, name } = task;
  let db = await connectDB();
  let collection = db.collection(`task`);

  if (group) {
    await collection.updateOne({ id }, { $set: { group } });
  }

  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }

  if (isComplete !== undefined) {
    await collection.updateOne({ id }, { $set: { isComplete } });
  }
};

app.post("/task/new", async (request, response) => {
  let task = request.body.task;
  await addNewTask(task);
  response.status(200).send();
});

app.post("/task/update", async (request, response) => {
  let task = request.body.task;
  await updateTask(task);
  response.status(200).send();
});
