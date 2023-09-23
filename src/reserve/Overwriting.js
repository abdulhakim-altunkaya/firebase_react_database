// App.js
import React, { useState } from 'react';
import app from './firebaseConfig'; // Import the firebase app you initialized
import { getDatabase, ref, set } from "firebase/database";

function App() {
  const [inputValue, setInputValue] = useState(''); // Local state to hold input value

  const writeData = () => {
    const db = getDatabase();
    set(ref(db, 'some/where'), {
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