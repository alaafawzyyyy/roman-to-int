const romanValues = {
  I: 1, V: 5, X: 10, L:50, C: 100, D: 500, M: 1000
};


// A function converts roman to integer
 export function romanToInt(roman) {
  let total = 0;
  let prev = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const currentSymbol = roman[i];
    const currentValue = romanValues[currentSymbol];

    if (!currentValue) return null; 

    if (currentValue < prev) {
      total -= currentValue;
    } else {
      total += currentValue;
    }

    prev = currentValue;
  }

  return total;
}

//roman validation function

export function validateRomanInput(roman) {

  if (!roman || typeof roman !== 'string') {
    return { error: 'Input must be a string' };
  }

  const upperRoman = roman.toUpperCase();
  const validRomanRegex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

  if (!validRomanRegex.test(upperRoman)) {
    return { error: 'Invalid Roman numeral format' };
  }

  return { value: upperRoman };
}

