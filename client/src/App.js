import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const newUser = { name, email };

    // send data to the server
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        const addedUser = data;
        const newUser = [...users, addedUser];
        setUsers(newUser);
      });
    nameRef.current.value = "";
    emailRef.current.value = "";
  };

  return (
    <div>
      <h2>Found Users: {users.length}</h2>

      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} placeholder="Name" name="" id="" />
        <input type="text" ref={emailRef} placeholder="Email" name="" id="" />
        <input type="submit" value="Submit" />
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            id:{user.id} email:{user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
