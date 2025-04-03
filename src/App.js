import './App.css';
import Buttons from "./buttons.js";
import { handleClick } from './handles.js';
import CalculatorV1 from './version1.js';
import { useState } from 'react';

function App() {
    const [msg, setMsg] = useState('');
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');

    const [showV1, setShowV1] = useState(false);
    const [/*showV2*/, setShowV2] = useState(false);
    const [/*showV3*/, setShowV3] = useState(false);

    return (
        <div className="h-screen w-screen overflow-hidden bg-gradient-to-br animate-gradient bg-[length:200%_200%] text-white text-2xl relative">
        
        <div className="flex flex-row justify-evenly py-5 bg-indigo-950">
            <Buttons 
                show="Calculadora 1" 
                colorClass="bg-green-950 border-green-500 hover:bg-green-700"
                onClick={() => {
                    handleClick("Versión 1", setMsg, setNum1, setNum2)
                    setShowV1(true);
                    setShowV2(false);
                    setShowV3(false);
                }}
            />
            <Buttons 
                show="Calculadora 2" 
                colorClass="bg-green-950 border-green-500 hover:bg-green-700"
                onClick={() => {
                    handleClick("Versión 2", setMsg, setNum1, setNum2)
                    setShowV1(false);
                    setShowV2(true);
                    setShowV3(false);
                }}
            />
            <Buttons 
                show="Calculadora 3" 
                colorClass="bg-green-950 border-green-500 hover:bg-green-700"
                onClick={() => {
                    handleClick("Versión 3", setMsg, setNum1, setNum2)
                    setShowV1(false);
                    setShowV2(false);
                    setShowV3(true);
                }}
            />

            <Buttons
                show="Reset"
                colorClass="bg-red-950 border-red-500 hover:bg-red-700 absolute top-5 right-5"
                onClick={() => {
                    setShowV1(false);
                    setShowV2(false);
                    setShowV3(false);
                }}
            />
        </div>

        {showV1 && <CalculatorV1 msg={msg} num1={num1} setNum1={setNum1} num2={num2} setNum2={setNum2} />}
        </div>
    );
}

export default App;


/*<a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
  asdhksak
  </a>
*/