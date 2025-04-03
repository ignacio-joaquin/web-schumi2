import Buttons from './buttons.js';
import { handleNum } from './handles.js';
import { useState, useEffect } from 'react';

const CalculatorV1 = ({ msg, num1, setNum1, num2, setNum2 }) => {
    const [result, setResult] = useState('');
    const [selectedOperation, setSelectedOperation] = useState(null);

    const calculateResult = () => {
        if (!num1 || !num2) {
            setResult("Tiene que ingresar dos números válidos");
            return;
        }

        if (!selectedOperation) {
            setResult('');
            return;
        }

        let result;
        switch (selectedOperation) {
            case "+":
                result = parseFloat(num1) + parseFloat(num2);
                break;
            case "-":
                result = parseFloat(num1) - parseFloat(num2);
                break;
            case "*":
                result = parseFloat(num1) * parseFloat(num2);
                break;
            case "/":
                result = parseFloat(num1) / parseFloat(num2);
                break;
            default:
                result = "Operación no válida";
        }

        setResult((isNaN(result)) ?
        "Mis dos huevos" : (result === Infinity) ?
        "No es posible la división por Cero" : `Resultado: ${result}`);
    };

    // Actualiza el resultado en tiempo real
    useEffect(() => {
        calculateResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [num1, num2, selectedOperation]); // Se ejecuta cuando cambian num1, num2 o la operación

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white p-10 rounded-2xl shadow-lg text-2xl z-10 flex flex-col items-center gap-4">
            <div>{msg}</div>

            <input
                type="text"
                inputMode="numeric"
                value={num1}
                onChange={(aux) => handleNum(aux, setNum1)}
                className="p-2 rounded-lg text-black w-40 text-xl"
                placeholder="Número 1"
            />

            <input
                type="text"
                inputMode="numeric"
                value={num2}
                onChange={(aux) => handleNum(aux, setNum2)}
                className="p-2 rounded-lg text-black w-40 text-xl"
                placeholder="Número 2"
            />

            <div className="mt-4 space-x-4">
                <Buttons 
                    show="Suma" 
                    colorClass={`w-32 h-12 ${
                        selectedOperation === "+" ? "bg-blue-700 border-blue-300" : "bg-blue-950 border-blue-500 hover:bg-blue-700"
                    }`}
                    onClick={() => setSelectedOperation("+")}
                />
                <Buttons 
                    show="Resta" 
                    colorClass={`w-32 h-12 ${
                        selectedOperation === "-" ? "bg-blue-700 border-blue-300" : "bg-blue-950 border-blue-500 hover:bg-blue-700"
                    }`}
                    onClick={() => setSelectedOperation("-")}
                />
                <Buttons 
                    show="Producto" 
                    colorClass={`w-32 h-12 ${
                        selectedOperation === "*" ? "bg-blue-700 border-blue-300" : "bg-blue-950 border-blue-500 hover:bg-blue-700"
                    }`}
                    onClick={() => setSelectedOperation("*")}
                />
                <Buttons 
                    show="Cociente" 
                    colorClass={`w-32 h-12 ${
                        selectedOperation === "/" ? "bg-blue-700 border-blue-300" : "bg-blue-950 border-blue-500 hover:bg-blue-700"
                    }`}
                    onClick={() => setSelectedOperation("/")}
                />
            </div>

            <div className="mt-4 text-xl">
                {result}
            </div>
        </div>
    );
};

export default CalculatorV1;