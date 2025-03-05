import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRightLeft } from 'lucide-react';
import { UnitConverter } from './components/UnitConverter';
import { ConversionType } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const conversionTypes: ConversionType[] = [
    {
      id: 'length',
      label: 'Length',
      units: [
        { id: 'meters', label: 'Meters' },
        { id: 'feet', label: 'Feet' },
        { id: 'kilometers', label: 'Kilometers' },
        { id: 'miles', label: 'Miles' }
      ]
    },
    {
      id: 'weight',
      label: 'Weight',
      units: [
        { id: 'kilograms', label: 'Kilograms' },
        { id: 'pounds', label: 'Pounds' },
        { id: 'grams', label: 'Grams' },
        { id: 'ounces', label: 'Ounces' }
      ]
    },
    {
      id: 'temperature',
      label: 'Temperature',
      units: [
        { id: 'celsius', label: 'Celsius' },
        { id: 'fahrenheit', label: 'Fahrenheit' },
        { id: 'kelvin', label: 'Kelvin' }
      ]
    },
    {
      id: 'speed',
      label: 'Speed',
      units: [
        { id: 'kmh', label: 'km/h' },
        { id: 'mph', label: 'mph' }
      ]
    },
    {
      id: 'time',
      label: 'Time',
      units: [
        { id: 'hours', label: 'Hours' },
        { id: 'minutes', label: 'Minutes' },
        { id: 'seconds', label: 'Seconds' }
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <ArrowRightLeft className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Unit Converter</h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
        <UnitConverter conversionTypes={conversionTypes} />
      </div>
    </div>
  );
}

export default App;