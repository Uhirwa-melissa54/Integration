const express = require('express');
const dotenv=require('dotenv');
const app = express();
dotenv.config();
const port = process.env.PORT;
const cors=require('cors')

app.use(express.json());
app.use(cors());

// Built-in list of 5 students
let students = [
  { id: 1, name: "Alice", age: 17, grade: "S5", gender: "Female", combination: "MCB" },
  { id: 2, name: "Bob", age: 18, grade: "S6", gender: "Male", combination: "PCB" },
  { id: 3, name: "Clara", age: 17, grade: "S5", gender: "Female", combination: "MEG" },
  { id: 4, name: "David", age: 18, grade: "S6", gender: "Male", combination: "LFK" },
  { id: 5, name: "Ella", age: 17, grade: "S5", gender: "Female", combination: "PCM" }
];

// GET all students
app.get('/students', (req, res) => {
  res.json(students);
});
app.post('/students', (req,res)=>{
  const newUser=req.body;
  students.push(newUser)
  res.status(201).json({
    message:"New user created successfully"
  })
})


// DELETE a student by ID
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(student => student.id !== id);
  res.json({ message: `Student with id ${id} deleted.` });
});

// UPDATE a student by ID
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  // Update only provided fields
  students[index] = { ...students[index], ...req.body };
  res.json(students[index]);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
