import * as uuid from "uuid";
import md5 from "md5";
import { connectDB } from "./connect-db";
import { assembleUserState } from "./utility";

const authenticationTokens = [];

async function assembleUserState(user) {
  let db = await connectDB();

  let tasks = await db.collection(`tasks`).find({ owner: user.id }).toArray();

  let groups = await db.collection(`groups`).find({ owner: user.id }).toArray();

  return {
    tasks,
    groups,
    session: { authenticated: `AUTHENTICATED`, id: user.id },
  };
}

export const authenticationRoute = (app) => {
  app.post("/authenticate", async (request, response) => {
    let { username, password } = request.body;
    let db = await connectDB();
    let collection = db.collection(`users`);

    let user = await collection.findOne({ name: username });

    if (!user) {
      return response.status(500).send("User not found");
    }

    let hash = md5(password);
    let passwordCorrect = hash === user.passwordHash;

    if (!passwordCorrect) {
      return response.status(500).send("Password incorrect");
    }

    let token = uuid();

    authenticationTokens.push({
      token,
      userID: user.id,
    });

    let state = await assembleUserState(user);

    response.send({ token, state });
  });

  app.post("/user/create", async (request, response) => {
    let { username, password } = request.body;
    console.log(username, password);
    let db = await connectDB();
    let collection = db.collection(`users`);
    let user = await collection.findOne({ name: username });
    if (user) {
      response
        .status(500)
        .send({ message: "A user with that account name already exists." });
      return;
    }

    let userID = uuid();
    let groupID = uuid();

    await collection.insertOne({
      name: username,
      id: userID,
      passwordHash: md5(password),
    });

    await db.collection(`groups`).insertOne({
      id: groupID,
      owner: userID,
      name: `To Do`,
    });

    let state = await assembleUserState({ id: userID, name: username });

    res.status(200).send({ userID, state });
  });
};
