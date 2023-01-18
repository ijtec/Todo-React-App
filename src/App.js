import "./App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, deleteUser, editUser, editUsername, setInitialState } from "./Redux/reducers/User";

function App() {
const dispatch = useDispatch();  
useEffect(() => {
         fetch ('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => dispatch(setInitialState(data)))
}, [])
 
  const userList = useSelector((state) => state.users.value);
  console.log(userList)

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  return (
    <div className="App">
      {" "}
      <div className="addUsers mt-[5vh]  flex flex-col items-center justify-around lg:w-[400px] w-[300px] h-[250px]">
        <input
          className="h-[40px] w-[80%] border-[1px] outline-[#9BE150] p-2 rounded-xl border-[#9BE150] border-solid"
          type="text"
          placeholder="Input your Todo"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <div className="flex flex-col w-full h-[30%] items-center justify-between">
          <h1 className="text-[20px] font-bold">Set Date</h1>
          <input
          className="h-[40px] w-[80%] border-[1px] outline-[#9BE150] p-2 rounded-xl border-[#9BE150] border-solid"
            type="date"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <button
         className="bg-[#9BE150] h-[15%] w-[40%] text-white rounded-xl font-semibold"
          onClick={() => {
            dispatch(
              addUser(
                {
                  id : userList[userList.length - 1 ].id + 1,
                  name,
                  username
                }
              )
            );
          }}
        >
          {" "}
          Add Todo
        </button>
      </div>
      <div className="displayUsers">
        {userList.map((user) => {
          return (
            <div key={user.id} className='flex flex-col items-center'>
              <h1> {user.name}</h1>
              <h1> {user.username}</h1>
              <input
                className="text-black p-2"
                type="text"
                placeholder="New Username..."
                onChange={(event) => {
                  setNewUsername(event.target.value);
                }}
              />
              <button
                onClick={() => {
                  dispatch(
                    editUser({ id: user.id, username: newUsername })
                  );
                }}
              >
                {" "}
                Update Username
              </button>
              <button
                onClick={() => {
                  dispatch(deleteUser({ id: user.id }));
                }}
              >
                Delete User
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;