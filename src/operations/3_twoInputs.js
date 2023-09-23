// App.js
import React, { useState } from 'react';
import app from './firebaseConfig'; // Import the Firebase app you initialized
import { getDatabase, ref, set, push } from "firebase/database";

function App() {
  const [key, setKey] = useState(''); // Local state to hold key value (e.g. "yellow")
  const [value, setValue] = useState(''); // Local state to hold value (e.g. "a color")

  const writeData = () => {
    const db = getDatabase(app); // Pass in the app instance
    const newItemRef = push(ref(db, 'some/where')); // This generates a new child location with a unique ID
    set(newItemRef, {
      key,
      value
    }).then(() => {
      alert('Data written successfully!');
    }).catch((error) => {
      alert('Failed to write data:', error);
    });
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter key (e.g., yellow)"
        value={key} 
        onChange={(e) => setKey(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Enter value (e.g., a color)"
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
      />
      <button onClick={writeData}>
        Write to Firebase
      </button>
    </div>
  );
}

export default App;
