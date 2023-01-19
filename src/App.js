import "./App.css";
import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { addUser, deleteUser, editUser, editUsername, setInitialState } from "./Redux/reducers/User";

var CryptoJS = require("crypto-js");

function App() {
// const dispatch = useDispatch();  
 
  const [todos, setTodos] = useState([]) 
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [editDate, setEditDate] = useState("");
  const [isEdit, setIsEdit] = useState(false)

  const addTodo = () => {
    var encryptedId = CryptoJS.AES.encrypt(todo, 'WIZKID').toString();
        setTodos(prevState => [...prevState, {
           id: encryptedId,
           todo:todo,
           date:date
        }]);
        setDate("");
        setTodo('') ;
  }

  const deleteTodo = (todo) => {
    const removedItem = todos.filter( item => item !== todo);
    setTodos(removedItem)
 }

 const handleEdit = (id) => {  
      var bytes  = CryptoJS.AES.decrypt(id, 'WIZKID');
      var original = bytes.toString(CryptoJS.enc.Utf8); 

      const update = todos.map(todo => {
        if(original !== todo.todo){
          return
        }
        if (todo.id === id) {
          return {
            ...todo,
            todo:editTodo,
            date:editDate
          }
        }
      })
      setTodos(update)
                  
 }

  return (
    <div className="App">
      {" "}
      <div className="addUsers mt-[5vh]  flex flex-col items-center justify-around lg:w-[400px] w-[300px] h-[250px]">
        <input
          className="h-[40px] w-[80%] border-[1px] outline-[#9BE150] p-2 rounded-xl border-[#9BE150] border-solid"
          type="text"
          value={todo}
          placeholder="Input your Todo"
          onChange={(event) => {
            setTodo(event.target.value);
          }}
        />
        <div className="flex flex-col w-full h-[30%] items-center justify-between">
          <h1 className="text-[20px] font-bold">Set Date</h1>
          <input
          className="h-[40px] w-[80%] border-[1px] outline-[#9BE150] p-2 rounded-xl border-[#9BE150] border-solid"
          type='datetime-local'
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
        </div>
        <button
         className="bg-[#9BE150] h-[15%] w-[40%] text-white rounded-xl font-semibold"
          onClick={addTodo}
        >
          {" "}
          Add Todo
        </button>
      </div>
      <div className="displayUsers">
        {todos.map((todo) => {
          return (
            <div key={todo.id} className='flex flex-col items-center justify-around'>
              <h1> {todo.todo}</h1>
              <h1> {todo.date}</h1>
              {
                isEdit && <div className="flex w-full justify-between">
                  <input
                  className="text-black p-2 w-4/5"
                  type="text"
                  placeholder="Edit Todo..."
                  value={editTodo}
                  onChange={(event) => {
                    setEditTodo(event.target.value);
                  }}
                /> 
                  <input type='datetime-local'
                     className="text-black outline-0" 
                     value={editDate}
                     onChange={(event) => {
                      setEditDate(event.target.value);
                    }}
                  />
                <button className="bg-[green] p-2 shadow-2xl" onClick={() => handleEdit(todo.id)}>Update</button>      
                </div> 
               
              }    
              <div className="flex w-[15%] h-[20%] self-end mt-4 items-center justify-between">
                <i className="fa-solid fa-pen-to-square text-[green]" onClick={() => setIsEdit(true)} ></i>
                    <i className="fa-solid text-[red] fa-trash-can"
                          onClick={() => deleteTodo(todo)}></i>
              </div>
              
            </div>
            

          );
        })}
        <div id="one">
            <p>Pray <span>7am</span></p>
        </div>
        <div id="two">
            <p> Daily Stand Up Meeting <span>8am</span> </p>
        </div>
        <div id="three">
            <p> Work on project <span>10am</span></p>
        </div>
        <div id="four">
            <p> Practice French <span> 11am & 10:30pm</span></p>
        </div>
            </div>
            
      </div>
    
    // onClick={() => {
    //   dispatch(
    //     editUser({ id: todo.id, todo: editTodo })
    //   );
    // }}
  );
}

export default App;