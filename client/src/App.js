import './App.css';
import Button from './components/button/Button.jsx'
import backgroundImg from './images/EldenRingFull.jpg'
import React, { useState, useEffect } from 'react';
import handleCalculations from './utils/calculations/stat_calculations'

function App() {
    const [count, setCount] = useState(1);
    const [result, setResult] = useState(1);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
        getResultValue();
    }, [count])

    const getResultValue = () => {
        const value = handleCalculations(count, 'FP (Mind)')
        console.log(value)
        setResult(value)
    }

    return (
        <div className="App">
            <p>Result: {result}</p>
            <div className="main-container">
                <input value={count} type="number" id="quantity" name="quantity" min="1" max="99" onChange={evt => setCount(evt.target.value)}></input>
            </div>
        </div>
);
}

export default App;
