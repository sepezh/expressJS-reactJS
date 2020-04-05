import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { defaultState } from "./defaultState";

let port = 7777;
let app = express();

const authorizationTokens = [];

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.get("/user/:id", (request, response) => {
  let user = defaultState.users.find((user) => user.id === request.params.id);
  if (!user) {
    response.status(500).send();
  } else {
    response.json(user);
  }
});

app.post(`/task/new`, (request, response) => {
  let { task } = request.body;
  response.status(200).send();
});

app.post(`/task/update`, (request, response) => {
  let { task } = request.body;
  response.status(200).send();
});

app.post(`comment/new`, (request, response) => {
  response.status(200).send();
});
