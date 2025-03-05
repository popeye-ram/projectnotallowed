const conversions = {
  length: {
    meters: {
      feet: (value: number) => value * 3.28084,
      kilometers: (value: number) => value / 1000,
      miles: (value: number) => value * 0.000621371
    },
    feet: {
      meters: (value: number) => value / 3.28084,
      kilometers: (value: number) => value / 3280.84,
      miles: (value: number) => value * 0.000189394
    },
    kilometers: {
      meters: (value: number) => value * 1000,
      feet: (value: number) => value * 3280.84,
      miles: (value: number) => value * 0.621371
    },
    miles: {
      meters: (value: number) => value / 0.000621371,
      feet: (value: number) => value / 0.000189394,
      kilometers: (value: number) => value / 0.621371
    }
  },
  weight: {
    kilograms: {
      pounds: (value: number) => value * 2.20462,
      grams: (value: number) => value * 1000,
      ounces: (value: number) => value * 35.274
    },
    pounds: {
      kilograms: (value: number) => value / 2.20462,
      grams: (value: number) => value * 453.592,
      ounces: (value: number) => value * 16
    },
    grams: {
      kilograms: (value: number) => value / 1000,
      pounds: (value: number) => value / 453.592,
      ounces: (value: number) => value / 28.3495
    },
    ounces: {
      kilograms: (value: number) => value / 35.274,
      pounds: (value: number) => value / 16,
      grams: (value: number) => value * 28.3495
    }
  },
  temperature: {
    celsius: {
      fahrenheit: (value: number) => (value * 9/5) + 32,
      kelvin: (value: number) => value + 273.15
    },
    fahrenheit: {
      celsius: (value: number) => (value - 32) * 5/9,
      kelvin: (value: number) => (value - 32) * 5/9 + 273.15
    },
    kelvin: {
      celsius: (value: number) => value - 273.15,
      fahrenheit: (value: number) => (value - 273.15) * 9/5 + 32
    }
  },
  speed: {
    kmh: {
      mph: (value: number) => value * 0.621371
    },
    mph: {
      kmh: (value: number) => value / 0.621371
    }
  },
  time: {
    hours: {
      minutes: (value: number) => value * 60,
      seconds: (value: number) => value * 3600
    },
    minutes: {
      hours: (value: number) => value / 60,
      seconds: (value: number) => value * 60
    },
    seconds: {
      hours: (value: number) => value / 3600,
      minutes: (value: number) => value / 60
    }
  }
};

export function convert(value: number, from: string, to: string, type: string): number {
  if (from === to) return value;
  
  const conversionType = conversions[type as keyof typeof conversions];
  const fromUnit = conversionType[from as keyof typeof conversionType];
  
  if (fromUnit && fromUnit[to as keyof typeof fromUnit]) {
    return fromUnit[to as keyof typeof fromUnit](value);
  }
  
  // If direct conversion doesn't exist, try reverse conversion
  const toUnit = conversionType[to as keyof typeof conversionType];
  if (toUnit && toUnit[from as keyof typeof toUnit]) {
    return 1 / toUnit[from as keyof typeof toUnit](1 / value);
  }
  
  return value;
}