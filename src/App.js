// App.js
import React, { useState } from 'react';
import app from './firebaseConfig'; // Import the Firebase app you initialized
import { getDatabase, ref, set, push } from "firebase/database";

function App() {
  const [inputValue, setInputValue] = useState(''); // Local state to hold input value

  const writeData = () => {
    const db = getDatabase(app); // Pass in the app instance
    const newItemRef = push(ref(db, 'some/where')); // This generates a new child location with a unique ID
    set(newItemRef, {
      inputValue
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
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button onClick={writeData}>
        Write to Firebase
      </button>
    </div>
  );
}

export default App;