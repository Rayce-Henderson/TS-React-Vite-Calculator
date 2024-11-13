import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [prevNumber, setPrevNumber] = useState('');
  const [currentOperator, setCurrentOperator] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const operators = ['+', '-', '×', '÷'];
  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      if (num === '.' && display.includes('.')) return;
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    if (currentOperator && !isNewNumber) {
      calculate();
    }
    setPrevNumber(display);
    setCurrentOperator(op);
    setIsNewNumber(true);
    setEquation(`${display} ${op}`);
  };

  const calculate = () => {
    if (!prevNumber || isNewNumber) return;
    
    const prev = parseFloat(prevNumber);
    const current = parseFloat(display);
    let result = 0;

    switch (currentOperator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) {
          setDisplay('Error');
          setIsNewNumber(true);
          return;
        }
        result = prev / current;
        break;
    }

    setDisplay(result.toString());
    setEquation('');
    setPrevNumber('');
    setCurrentOperator('');
    setIsNewNumber(true);
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setPrevNumber('');
    setCurrentOperator('');
    setIsNewNumber(true);
  };

  const handleKeyboard = (e: KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
      handleNumber(e.key);
    } else if (e.key === '+' || e.key === '-') {
      handleOperator(e.key);
    } else if (e.key === '*') {
      handleOperator('×');
    } else if (e.key === '/') {
      e.preventDefault();
      handleOperator('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
      calculate();
    } else if (e.key === 'Escape') {
      clear();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [display, prevNumber, currentOperator, isNewNumber]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Calculator className="text-white/80 h-6 w-6" />
            <span className="text-white/80 text-sm font-medium">Calculator</span>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-4 space-y-2">
            <div className="text-white/60 text-right h-6 text-sm">
              {equation}
            </div>
            <div className="text-white text-right text-4xl font-light tracking-wider">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={clear}
              className="col-span-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl p-4 transition-all duration-200 active:scale-95"
            >
              AC
            </button>
            {operators.map((op) => (
              <button
                key={op}
                onClick={() => handleOperator(op)}
                className={`${
                  currentOperator === op ? 'bg-white/30 text-white' : 'bg-white/10 text-white/80'
                } hover:bg-white/20 rounded-xl p-4 transition-all duration-200 active:scale-95`}
              >
                {op}
              </button>
            ))}
            {numbers.map((num) => (
              <button
                key={num}
                onClick={() => handleNumber(num)}
                className={`${
                  num === '0' ? 'col-span-2' : ''
                } bg-white/10 hover:bg-white/20 text-white/80 rounded-xl p-4 transition-all duration-200 active:scale-95`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={calculate}
              className="col-span-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 rounded-xl p-4 transition-all duration-200 active:scale-95"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;