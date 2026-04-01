const express = require("express");
const app = express();

app.use(express.json());

let students = [];
let id = 1;

// CREATE
app.post("/students", (req, res) => {
    const student = { id: id++, ...req.body };
    students.push(student);
    res.send(student);
});

// READ ALL
app.get("/students", (req, res) => {
    res.send(students);
});

// READ ONE
app.get("/students/:id", (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    res.send(student || "Student not found");
});

// UPDATE
app.put("/students/:id", (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (student) {
        Object.assign(student, req.body);
        res.send(student);
    } else {
        res.send("Student not found");
    }
});

// DELETE
app.delete("/students/:id", (req, res) => {
    students = students.filter(s => s.id != req.params.id);
    res.send("Deleted");
});

app.listen(3000, () => console.log("Server running on port 3000"));
