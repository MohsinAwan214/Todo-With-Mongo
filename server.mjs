import  './dateBase.js'
import express from "express";
import cors from 'cors'
const app = express();
const port = process.env.PORT || 5003;

let todos = [];
app.use(express.json());
app.use(cors( {origin : ["http://localhost:5173", "https://todo-with-backend.surge.sh"] }));

// app.get("/", (req, res) => {
//   res.send('testing todos');
// });


app.get("/api/v1/todos", (req, res) => {
  const message = !todos.length ? "todo empty" : "all todos";

  res.send({ data: todos, message: message });
});

// ye naya todo add krny ke ley he
app.post("/api/v1/todo", (req, res) => {
  const obj = {
    todoContent: req.body.todo,
    id: String(new Date().getTime()),
  };

  todos.push(obj);

  res.send({ message: "todo add ho gaya", data: obj });
});

// ye todo ko upDate ya edit krny ke ley he
app.patch("/api/v1/todo/:id", (req, res) => {
  const id = req.params.id
  console.log("ye he id", id);
  let isFound = false;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      // idher product mil chuka he ab us product ko edit krna he
      todos[i].todoContent = req.body.todoContent;
      isFound = true;
      break;
    }
  }
  if (isFound) {
    res.status(201).send({
      data: {todoContent: req.body.todoContent, id: id,},
      message: "todo updated successfully!",
    });
  } else {
    res.status(200).send({ data: null , message: "todo not found" });
  }
});


// ye todo ko elete krny ke ley he
app.delete("/api/v1/todo/:id", (req, res) => {

  const id = req.params.id
  let isFound = false;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      // idher product mil chuka he ab us product ko delete krna he

todos.splice(i,1)

      isFound = true;
      break;
    }
  }
  if (isFound) {
    res.status(201).send({
      // data: {todoContent: req.body.todoContent, id: id,},
      message: "todo deleted successfully!",
    });
  } else {
    res.status(200).send({ data: null , message: "todo not found" });
  }


});

app.use("/", (req, res) => {
  res.status(404).send({message:"No route found"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
