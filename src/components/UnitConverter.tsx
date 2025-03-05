import React, { useState, useEffect } from 'react';
import { ConversionType } from '../types';
import { convert } from '../utils/converter';

interface UnitConverterProps {
  conversionTypes: ConversionType[];
}

export function UnitConverter({ conversionTypes }: UnitConverterProps) {
  const [selectedType, setSelectedType] = useState(conversionTypes[0]);
  const [fromUnit, setFromUnit] = useState(selectedType.units[0].id);
  const [toUnit, setToUnit] = useState(selectedType.units[1].id);
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  useEffect(() => {
    const result = convert(parseFloat(fromValue) || 0, fromUnit, toUnit, selectedType.id);
    setToValue(result.toFixed(4));
  }, [fromValue, fromUnit, toUnit, selectedType]);

  const handleTypeChange = (typeId: string) => {
    const newType = conversionTypes.find(type => type.id === typeId)!;
    setSelectedType(newType);
    setFromUnit(newType.units[0].id);
    setToUnit(newType.units[1].id);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Conversion Type
        </label>
        <select
          value={selectedType.id}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {conversionTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            From
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {selectedType.units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter value"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            To
          </label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {selectedType.units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={toValue}
            readOnly
            className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white"
            placeholder="Result"
          />
        </div>
      </div>

      <button
        onClick={swapUnits}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        Swap Units
      </button>
    </div>
  );
}