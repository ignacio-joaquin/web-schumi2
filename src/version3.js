import { useState } from 'react';

const CalculatorV3 = ({ msg }) => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const evaluateExpression = () => {
        try {
            const res = eval(expression);
            const newResult = `Resultado: ${res}`;
            setResult(newResult);

            const newHistory = [expression, ...history];
            if (newHistory.length > 10) newHistory.pop();

            setHistory(newHistory);
            setHistoryIndex(-1);
        } catch (error) {
            setResult('Expresión inválida');
        }
    };

    const isValidInput = (key) => {
        
        return /^[0-9+\-*/().]$/.test(key) || ['Backspace', 'Delete', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key);
    };

    const handleKeyDown = (e) => {
        if (!isValidInput(e.key)) {
            e.preventDefault();
        }

        if (e.key === 'Enter') {
            evaluateExpression();
        } else if (e.key === 'ArrowDown') {
            if (historyIndex + 1 < history.length) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setExpression(history[newIndex]);
            }
        } else if (e.key === 'ArrowUp') {
            if (historyIndex - 1 >= 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setExpression(history[newIndex]);
            } else {
                setHistoryIndex(-1);
                setExpression('');
            }
        }
    };

    const handleChange = (e) => {
        const filtered = e.target.value.replace(/[^0-9+\-*/().]/g, '');
        setExpression(filtered);
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-90 text-white p-10 rounded-2xl shadow-lg text-2xl z-10 flex flex-col items-center gap-6 w-[90%] max-w-xl">
            <div>{msg}</div>

            <input
                type="text"
                value={expression}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="p-4 rounded-lg text-black w-full text-xl"
                placeholder="Escribe una expresión (ej: 2*(3+4)/2)"
            />

            <button
                onClick={evaluateExpression}
                className="bg-blue-800 hover:bg-blue-600 px-6 py-2 rounded-lg border border-blue-300"
            >
                Calcular
            </button>

            <div className="text-lg text-yellow-400">{result}</div>

            <div className="w-full mt-6">
                <h2 className="text-lg underline mb-2">Historial (últimas 10)</h2>
                <ul className="max-h-40 overflow-y-auto space-y-1 text-base bg-black bg-opacity-30 p-2 rounded">
                    {history.map((item, idx) => (
                        <li key={idx} className={idx === historyIndex ? 'text-green-400' : 'text-white'}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CalculatorV3;
