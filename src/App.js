import "./App.css";
import { useState, useRef} from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { addUser, deleteUser, editUser, editUsername, setInitialState } from "./Redux/reducers/User";
import emailjs from '@emailjs/browser';




var CryptoJS = require("crypto-js");

function App() {
// const dispatch = useDispatch();  
 
  const [todos, setTodos] = useState([]) 
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [editDate, setEditDate] = useState("");
  const [isEdit, setIsEdit] = useState(false)
  const [email, setEmail] = useState('')
  

  const addTodo = () => {
    var encryptedId = CryptoJS.AES.encrypt(todo, 'ICE').toString();
    if(todo ==='' || date === '') {
      return
    } {
      setTodos(prevState => [...prevState, {
         id: encryptedId,
         todo:todo,
         date:date
      }]);
      setDate("");
      setTodo('') ;
    }
  }

  const deleteTodo = (todo) => {
    const removedItem = todos.filter( item => item !== todo);
    setTodos(removedItem)
 }

 const handleEdit = (id) => {  
      var bytes  = CryptoJS.AES.decrypt(id, 'ICE');
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

 const form = useRef()
 const sendEmail = (e) => {
  e.preventDefault();
  emailjs.sendForm('service_efh8gh4', 'template_cumjl1u', form.current, 'zb56Hveo6uJdFBQqw')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
  e.target.reset()
  addTodo()
}
  return (
    <div className="App">
      {" "}
      <form  onSubmit={sendEmail} ref={form} className="addUsers mt-[5vh] flex flex-col items-center justify-around lg:w-[400px] w-[300px] h-[350px]">
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
        <div className="flex flex-col w-full h-[30%] items-center justify-between">  
          <h1 className="text-[20px] font-bold">Email Adreess</h1>
          <input className="h-[40px] w-[80%] border-[1px] outline-[#9BE150] p-2 rounded-xl border-[#9BE150] border-solid" type='email' placeholder='Email Address' name="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
          </div> 
          <button
          className="bg-[#9BE150] h-[15%] w-[40%] text-white rounded-xl font-semibold"
            // onClick={addTodo}
          >
            {" "}
            Add Todo
          </button>
      </form>
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

            {/* <form ref={form} onSubmit={sendEmail}> 
            <input type='text' className='form-control' placeholder='name' name="user_name"/>
           
            <button type="submit">Send Email</button> */}

            {/* </form> */}
              </div>
              
            </div>
            

          );
        })}
        <div id="one">
            <p>Pray </p>
        </div>
        <div id="two">
            <p> Daily Stand Up Meeting</p>
        </div>
        <div id="three">
            <p> Work on project</p>
        </div>
        <div id="four">
            <p> Practice French</p>
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