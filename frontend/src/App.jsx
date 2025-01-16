import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function App() {
  const BASE_URL = "https://todo-with-backend-chi.vercel.app";

  const [todos, setTodos] = useState([]);
  console.log(todos);
  
  const [editedText, setIseditedText] = useState(" ")


  const getTodo = async () => {
   try {
    const res = await axios.get(`${BASE_URL}/api/v1/todos`);
    const todosFromServer = res?.data?.data;

    console.log("todosFromServer", todosFromServer);
    const newnew = todosFromServer.map((todo) => {
      return { ...todo, isEditing: false };
    });
    setTodos(newnew);
  } catch (error) {
     toast.dismiss()
     toast.success(error?.response?.data?.message || "unknown error");
    
   }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const addTodo = async (event) => {
    try {
      event.preventDefault();

      const todoValue = event.target.children[0].value;
      await axios.post(
        `${BASE_URL}/api/v1/todo`,

        {
          todo: todoValue,
        }
      );
      getTodo();

      event.target.reset();
    } catch (error) {
      toast.dismiss()
      toast.success(error?.response?.data?.message || "unknown error");
    }
  };
  
  
  const editTodo = async (event,todoId) => {
    try {
      event.preventDefault();

      const todoValue = event.target.children[0].value;
      await axios.patch(
        `${BASE_URL}/api/v1/todo/${todoId}`,

        {
          todoContent: todoValue,
          // todo: editedText,
        }
      );
      getTodo();

      event.target.reset();
    } catch (error) {
      toast.dismiss()
      toast.success(error?.response?.data?.message || "unknown error");
    }
  };


  

  const deleteTodo = async (todoId) => {
    try {
      console.log("todoId", todoId);
      const { data } = await axios.delete(`${BASE_URL}/api/v1/todo/${todoId}`);

      console.log("data", data);

      toast.success(data?.message);
      getTodo();
    } catch (error) {
      toast.success(error?.response?.data?.message || "unknown error");
    }
  };

  // const editTodo = async (todoId) =>{
  // console.log("meretodoId",todoId);

  // try {
  //   const { data } = await axios.patch(`${BASE_URL}/api/v1/todo/${todoId}`);
  //   console.log("data mera", data);

  // } catch (error) {
  //   console.log(error);

  // }

  // }

  // const [isChange , setisChange] = useState("")

  // const onChange = (event) => {
  //   try {
  //     event.preventDefault();

  //     const todoValue = event.target.children[0].value;
  //     console.log("todoValue", todoValue);

  //     // await axios.post(
  //     //   `${BASE_URL}/api/v1/todo`,

  //     // {
  //     //   todo: todoValue,
  //     //   // }

  //     // );
  //     getTodo();

  //     event.target.reset();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // console.log(event.target.value);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          To-Do List
        </h1>

        <div className="flex flex-col  items-center space-x-3 mb-6">
          <form className="flex gap-2 flex-col" onSubmit={addTodo}>
            <input
              type="text"
              placeholder="Add a new task"
              className="w-80 p-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />

            <button className="bg-blue-600 w-80 text-white p-2 rounded shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
              Add Task
            </button>
          </form>
        </div>

        {!todos.length && "todo nhi he todo add kry"}

        <ul className="space-y-4">
          {todos?.map((todo, index) => (
            <li
              key={todo.id}
              className="flex items-center justify-between  p-4  bg-gray-100 rounded-lg shadow-md"
            >
              {!todo.isEditing ? (
                <span className="text-gray-800 font-medium">
                  {todo.todoContent}
                </span>
              ) : (

                <form onSubmit={(e)=>editTodo(e,todo.id)} className="flex justify-between  w-full">


                <input
        
                className="border-2"
                type="text"
                defaultValue={todo.todoContent}
                />
                    <button
                    onClick={() => {
                      const newTodos = todos.map((todo) => {
                        // if (i === index) {
                        todo.isEditing = false;

                        return todo;
                      });
                      setTodos([...todos]);
                    }}
                    type="button"
                  >
                    cancel
                  </button>

                <button type="submit">save</button>
                </form>
              )}
              <div className="flex gap-5 ">
                {!todo.isEditing ? (
                  <button
                    onClick={() => {
                      const newTodos = todos.map((todo, i) => {
                        if (i === index) {
                          todo.isEditing = true;
                        } else {
                          todo.isEditing = false;
                        }
                        return todo;
                      });
                      // todos[index].isEditing = true;
                      setTodos([...todos]);
                    }}
                    className="text-purple-500 hover:text-red-500"
                  >
                    Edit
                  </button>
                ) : (
                 null
                )}
                {!todo.isEditing ? (
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ) : (
                  null
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
