import { useState, useEffect, useCallback } from 'react';

const Operador = ({ children, onClick, ...props }) => {
  return (
    <button
      className="w-[200px] h-[120px] m-1 text-white text-xl font-bold rounded-lg bg-[var(--opbuttons)] hover:bg-[var(--hovver)] "
      onClick = { () => onClick(children)}
      {...props}
    >
      {children}
    </button>
  );
};

const Numeros = ({ children, className="", onClick, ...props }) => {
  return (
    <button
      className="w-[200px] h-[120px] m-1 text-white text-xl font-bold bg-gray-700 rounded-lg hover:bg-gray-600 "
      onClick = { () => onClick(children)}
      {...props}
    >
      {children}
    </button>
  );
};


function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = value => {
    try{if (
          (ops.includes(value) && calc === '' ) || (ops.includes(value) && ops.includes(calc.slice(-1)))
        )   { 
       return; 
      }
    }
    catch(error){
      setCalc(calc + value);
    }

    setCalc(calc + value);

    if (!ops.includes(value)){
      setResult(eval(calc + value).toString());
   }
  }

  

  const calculate = () => {
    try{
      setCalc(eval((calc).toString())); 
    }
    catch(error){
      return;
    }
  }
  const deleteLast = () => {
    try{ 
      if (calc === ''){
        return; 
      }
      const value = calc.slice(0, -1);
      setCalc(value);
    }
    catch(error){
      setCalc("");
      setResult("0");
    }
  }

  const handleKeyPress = useCallback((event) => {
    const { key } = event;
    if (/^[0-9]$/.test(key) || ops.includes(key)) {
      updateCalc(key);
    }
    if (key === 'Enter') {
      calculate();
    }
    if (key === 'Backspace') {
      deleteLast();
    }
  }, [updateCalc, calculate, deleteLast]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]); // Dependencia estable si las funciones son memoizadas

  return(
    <div className="app flex min-h-screen items-center justify-center m-[0] bg-[var(--background2)]" >
      <div className="calculator w-[1000px] h-[1000px] rounded-[16px] overflow-hidden p-16 bg-[var(--body2)]">

        <div className="display p-8 text-right rounded-[8px] text-white text-[30px] font-semibold bg-[var(--buttons)]">
          {result ? <span className="text-sm "  style={{ color: "var(--text)" }}>({result})</span> : '' } { calc || "0" }
        </div>

        
        <div className="operators grid grid-cols-4 gap-2 mt-4">
          <Operador onClick={updateCalc}>/</Operador>
          <Operador onClick={updateCalc}>*</Operador>
          <Operador onClick={updateCalc}>-</Operador>
          <Operador onClick={deleteLast}>DEL</Operador>
        </div>

        <div className="flex gap-6 mt-4">
          <div className="grid grid-cols-3 gap-2 w-650">
            <Numeros onClick={updateCalc}>7</Numeros>
            <Numeros onClick={updateCalc}>8</Numeros>
            <Numeros onClick={updateCalc}>9</Numeros>
            <Numeros onClick={updateCalc}>4</Numeros>
            <Numeros onClick={updateCalc}>5</Numeros>
            <Numeros onClick={updateCalc}>6</Numeros>
            <Numeros onClick={updateCalc}>1</Numeros>
            <Numeros onClick={updateCalc}>2</Numeros>
            <Numeros onClick={updateCalc}>3</Numeros>
            <Numeros onClick={updateCalc}>0</Numeros>
            <Numeros onClick={updateCalc}>.</Numeros> 
          </div>

          <div className="flex flex-col gap-2">
            <Operador className="w-[190px] h-[250px] m-1 text-white text-xl font-bold rounded-lg bg-[var(--opbuttons)] hover:bg-[var(--hovver)]" onClick={updateCalc}>+</Operador>
            <Operador className="w-[190px] h-[250px] m-1 text-white text-xl font-bold rounded-lg bg-[var(--opbuttons)] hover:bg-[var(--hovver)]" onClick={calculate}>=</Operador>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App;