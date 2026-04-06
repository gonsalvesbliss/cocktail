import express from "express";
import morgan from "morgan";
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(morgan("dev"));

// Dummy data
let students = [
  { id: 1, name: "Bliss", branch: "Computer" },
  { id: 2, name: "John", branch: "IT" }
];


// ✅ GET all students
app.get("/students", (req, res) => {
  res.json(students);
});


// ✅ GET student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  res.json(student);
});


// ✅ POST (Add student)
app.post("/students", (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.status(201).json(newStudent);
});


// ✅ PUT (Update student)
app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  students = students.map(s =>
    s.id == id ? { ...s, ...updatedData } : s
  );

  res.json({ message: "Student updated" });
});


// ✅ DELETE student
app.delete("/students/:id", (req, res) => {
  const id = req.params.id;

  students = students.filter(s => s.id != id);

  res.json({ message: "Student deleted" });
});


app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});