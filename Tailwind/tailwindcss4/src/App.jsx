import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]); // State for storing users
  const [name, setName] = useState("");   // State for input field

  // Add a new user to the list
  const addUser = () => {
    if (name.trim() !== "") {
      setUsers([...users, { id: Date.now(), name }]);
      setName(""); // Clear the input
    }
  };

  // Remove a user by ID
  const removeUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    // 👇 Changed background color from bg-gray-100 to bg-blue-100
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">User Manager</h1>

        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded-xl"
            placeholder="Enter user name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update input value
          />
          <button
            onClick={addUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {users.map(user => (
            <li
              key={user.id}
              className="flex justify-between items-center bg-gray-50 p-2 rounded-xl"
            >
              <span>{user.name}</span>
              <button
                onClick={() => removeUser(user.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
