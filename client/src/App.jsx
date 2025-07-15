import { useState } from 'react'
import './App.css'

function App() {
   const[roman,setRoman]=useState("")
   const[converted,setConverted]=useState(null)
   const [error, setError] = useState(null);
   const [history,setHistory]=useState([])
   const [showHistory,setShowHistory]=useState(false)


//convert roman to integer
  const handleConvert = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roman }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Invalid input");
      setConverted(null);
      return;
    }
    setConverted(data.integer);
    setError(null);
    setShowHistory(false)
  } catch (error) {
    console.log("API Error:", error);
    setError("Something went wrong");
    setConverted(null);
  }
};


//get all Conversions
    const handleShowHistory = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/conversions");
        const data = await res.json();
        setHistory(data);
        setShowHistory(true)
        setError()
      } catch (error) {
        console.error("Failed to fetch history", error);
      }
    };


//conversion by id


   return (

  <div className='container'>
    <h1>Roman to number converter</h1>

    <input
      value={roman}
      onChange={(e) => setRoman(e.target.value)}
      placeholder='Enter the roman numeral'
    />
    <div className='button-group'>
      <button onClick={handleConvert} className='convert-btn'>Convert</button>
      <button onClick={handleShowHistory} className='history-btn'>History</button>
    </div>
    {converted !== null && <p>Result: {converted}</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}

   
    {showHistory && history.length > 0 && (
      <div className="history-wrapper">
        <h3>Conversion History</h3>
        <button
           className="close-btn"
           onClick={() => setShowHistory(false)}
           title="Close"
        >
             X
        </button>
        <div className='history-scroll'>
         <table className="history-table">
          <thead>
           <tr>
            <th>#</th>
            <th>Roman</th>
            <th>Integer</th>
            <th>Date</th>
           </tr>
          </thead>
           <tbody>
            {history.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.roman}</td>
                <td>{item.integer}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
        ))}
            </tbody>
          </table>
        </div>
      </div>
     )}
     </div> )}


  export default App
