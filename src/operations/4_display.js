import React, { useState, useEffect } from 'react';
import app from './firebaseConfig'; // Import the Firebase app you initialized
import { getDatabase, ref, set, push, get } from "firebase/database";

function App() {
  const [key, setKey] = useState(''); // Local state to hold key value (e.g. "yellow")
  const [value, setValue] = useState(''); // Local state to hold value (e.g. "a color")
  const [data, setData] = useState([]); // Local state to hold fetched data

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

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'some/where');
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      setData(Object.values(snapshot.val()));
    } else {
      console.log("No data found");
    }
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
      <button onClick={fetchData}>
        Fetch Data
      </button>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.key}: {item.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
