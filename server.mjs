import express, { response } from "express";
import cors from 'cors'
import  './dateBase.js'
import { Todo } from "./models/index.js";
const app = express();
const port = process.env.PORT || 5003;


app.use(express.json());
app.use(cors( {origin : ["http://localhost:5173", "https://todo-with-mongo.surge.sh" ,"https://todo-with-mongo-git-main-mohsins-projects-7bea7ed3.vercel.app/"] }));

// app.get("/", (req, res) => {
//   res.send('testing todos');
// });


app.get("/api/v1/todos", async (req, res) => {
  try {
    const todos = await Todo.find({},{
    ip : 0 , __v: 0, updatedAt:0 
    })
  const message = !todos.length ? "todo empty" : "all todos";



  res.send({ data: todos, message: message });
  } catch (error) {
    res.status(500).send("internal server error")
  }
});

// ye naya todo add krny ke ley he
app.post("/api/v1/todo", async(req, res) => {
  try {
  const obj = {
    todoContent: req.body.todo,
    ip:  req.ip
  };
  
  const result = await Todo.create(obj)
  

  // todos.push(obj);

  res.send({ message: "todo add ho gaya", data: result });
} catch (error) {
   res.status(500).send("Please Add Your Todo")
  
 }
});

// ye todo ko upDate ya edit krny ke ley he
app.patch("/api/v1/todo/:id", async (req, res) => {
  const id = req.params.id
 

const result = await  Todo.findByIdAndUpdate(id,
  
     {
      todoContent: req.body.todoContent
     }

  )

console.log("result=>", result);



  if (result) {
    res.status(201).send({
      data: result,
      message: "todo updated successfully!",
    });
  } else {
    res.status(200).send({ data: null , message: "todo not found" });
  }
});


// ye todo ko elete krny ke ley he
app.delete("/api/v1/todo/:id", async(req, res) => {

  const id = req.params.id
 const result = await Todo.findByIdAndDelete(id)
  if (result) {
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
