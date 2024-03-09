import { useState } from "react";
import { Form } from "./Form";
import "./App.css";

function App() {
  const initialUsers = [
    {
      name: "aysinimsi",
      email: "aysinimsi@aysinimsi.com",
      password: "123456",
      kvkk: true,
    },
    {
      name: "zeus",
      email: "zeus@aysinimsi.com",
      password: "123456",
      kvkk: true,
    },
  ];
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const addUser = (userObj) => {
    setUsers([...users, userObj]);
  };
  const updateUser = (userUpdateObj) => {
    const updatedUsersArray = users.map((user) => {
      if (user.email === editingUser.email) {
        return userUpdateObj;
      } else {
        return user;
      }
    });
    setEditingUser(null);
    setUsers(updatedUsersArray);
  };
  return (
    <div className="App">
      <Form
        addUser={addUser}
        updateUser={updateUser}
        editingUser={editingUser}
      />
      <ul>
        {users.map((user, i) => (
          <li key={i}>
            {user.name} - {user.email}
            <button
              onClick={() => {
                setEditingUser(user);
              }}
            >
              edit{" "}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
