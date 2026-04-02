const express = require("express");
const app = express();
app.use(express.json());

const { initializeApp } = require("firebase/app");
const {
  getDatabase,
  ref,
  push,
  set,
  get,
  update,
  remove
} = require("firebase/database");

// your firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const usersRef = ref(db, "users");


// CREATE
app.post("/users", async (req, res) => {
  const { name } = req.body;
  const newRef = push(usersRef);
  await set(newRef, { name });
  res.json({ id: newRef.key, name });
});


// READ
app.get("/users", async (req, res) => {
  const snapshot = await get(usersRef);
  res.json(snapshot.val());
});


// UPDATE
app.put("/users/:id", async (req, res) => {
  const { name } = req.body;
  await update(ref(db, "users/" + req.params.id), { name });
  res.send("Updated");
});


// DELETE
app.delete("/users/:id", async (req, res) => {
  await remove(ref(db, "users/" + req.params.id));
  res.send("Deleted");
});


app.listen(3000, () => console.log("Running on 3000"));
