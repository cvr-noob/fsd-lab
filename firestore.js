const express = require("express");
const app = express();
app.use(express.json());

const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} = require("firebase/firestore");

// your firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const usersRef = collection(db, "users");


// CREATE
app.post("/users", async (req, res) => {
  const { name } = req.body;
  const newDoc = await addDoc(usersRef, { name });
  res.json({ id: newDoc.id, name });
});


// READ
app.get("/users", async (req, res) => {
  const snapshot = await getDocs(usersRef);

  const users = {};
  snapshot.forEach((doc) => {
    users[doc.id] = doc.data();
  });

  res.json(users);
});


// UPDATE
app.put("/users/:id", async (req, res) => {
  const { name } = req.body;
  await updateDoc(doc(db, "users", req.params.id), { name });
  res.send("Updated");
});


// DELETE
app.delete("/users/:id", async (req, res) => {
  await deleteDoc(doc(db, "users", req.params.id));
  res.send("Deleted");
});


app.listen(3000, () => console.log("Running on 3000"));
