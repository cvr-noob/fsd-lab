const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;
// Connect DB
async function connectDB() {
    await client.connect();
    db = client.db("moviesDB");
    console.log("MongoDB Connected");
}
connectDB();

app.post("/movies", async (req, res) => {
    const result = await db.collection("movies").insertOne(req.body);
    res.send(result);
});

app.get("/movies", async (req, res) => {
    const movies = await db.collection("movies").find().toArray();
    res.send(movies);
});

app.get("/movies/:id", async (req, res) => {
    const movie = await db.collection("movies").findOne({
        _id: new ObjectId(req.params.id)
    });
    res.send(movie);
});

app.put("/movies/:id", async (req, res) => {
    const result = await db.collection("movies").updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.send(result);
});

app.delete("/movies/:id", async (req, res) => {
    const result = await db.collection("movies").deleteOne({
        _id: new ObjectId(req.params.id)
    });
    res.send(result);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
