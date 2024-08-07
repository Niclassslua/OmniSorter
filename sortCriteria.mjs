const sortCriteria = {
    alphabetical: (a, b) => a.localeCompare(b),
    length: (a, b) => a.length - b.length,
    numeric: (a, b) => parseFloat(a) - parseFloat(b),
    date: (a, b) => new Date(a) - new Date(b),
    frequency: (a, b, options) => {
        const char = options.char || '';
        const countA = (a.split(char).length - 1);
        const countB = (b.split(char).length - 1);
        return countA - countB;
    },
    substring: (a, b, options) => {
        const substring = options.substring || '';
        return a.indexOf(substring) - b.indexOf(substring);
    },
    case: (a, b) => a.localeCompare(b, undefined, { sensitivity: 'case' }),
    uniqueChars: (a, b) => new Set(a).size - new Set(b).size,
    vowelCount: (a, b) => {
        const vowels = 'aeiouAEIOU';
        const countA = Array.from(a).filter(char => vowels.includes(char)).length;
        const countB = Array.from(b).filter(char => vowels.includes(char)).length;
        return countA - countB;
    },
    consonantCount: (a, b) => {
        const vowels = 'aeiouAEIOU';
        const countA = Array.from(a).filter(char => !vowels.includes(char) && /[a-zA-Z]/.test(char)).length;
        const countB = Array.from(b).filter(char => !vowels.includes(char) && /[a-zA-Z]/.test(char)).length;
        return countA - countB;
    },
    wordCount: (a, b) => a.split(/\s+/).length - b.split(/\s+/).length,
    asciiSum: (a, b) => {
        const sumA = Array.from(a).reduce((sum, char) => sum + char.charCodeAt(0), 0);
        const sumB = Array.from(b).reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return sumA - sumB;
    },
    palindrome: (a, b) => {
        const isPalindromeA = a === a.split('').reverse().join('');
        const isPalindromeB = b === b.split('').reverse().join('');
        return (isPalindromeA === isPalindromeB) ? 0 : (isPalindromeA ? -1 : 1);
    },
    punctuationCount: (a, b) => {
        const punctuation = '.,!?;:"\'-()[]{}';
        const countA = Array.from(a).filter(char => punctuation.includes(char)).length;
        const countB = Array.from(b).filter(char => punctuation.includes(char)).length;
        return countA - countB;
    },
    alphanumeric: (a, b) => {
        const regex = /(\d+|\D+)/g;
        const tokensA = a.match(regex);
        const tokensB = b.match(regex);
        for (let i = 0; i < Math.max(tokensA.length, tokensB.length); i++) {
            if (!tokensA[i]) return -1;
            if (!tokensB[i]) return 1;
            const isNumberA = !isNaN(tokensA[i]);
            const isNumberB = !isNaN(tokensB[i]);
            if (isNumberA && isNumberB) {
                const compareValue = parseInt(tokensA[i]) - parseInt(tokensB[i]);
                if (compareValue !== 0) return compareValue;
            } else {
                const compareValue = tokensA[i].localeCompare(tokensB[i]);
                if (compareValue !== 0) return compareValue;
            }
        }
        return 0;
    },
    prefix: (a, b, options) => {
        const prefix = options.prefix || '';
        return a.startsWith(prefix) - b.startsWith(prefix);
    },
    suffix: (a, b, options) => {
        const suffix = options.suffix || '';
        return a.endsWith(suffix) - b.endsWith(suffix);
    },
    spaceCount: (a, b) => (a.match(/\s/g) || []).length - (b.match(/\s/g) || []).length,
    reverseAsciiSum: (a, b) => {
        const sumA = Array.from(a).reduce((sum, char) => sum + (255 - char.charCodeAt(0)), 0);
        const sumB = Array.from(b).reduce((sum, char) => sum + (255 - char.charCodeAt(0)), 0);
        return sumA - sumB;
    },
    digitCount: (a, b) => (a.match(/\d/g) || []).length - (b.match(/\d/g) || []).length,
    vowelToConsonantRatio: (a, b) => {
        const vowels = 'aeiouAEIOU';
        const vowelCountA = Array.from(a).filter(char => vowels.includes(char)).length;
        const consonantCountA = Array.from(a).filter(char => !vowels.includes(char) && /[a-zA-Z]/.test(char)).length;
        const ratioA = consonantCountA === 0 ? vowelCountA : vowelCountA / consonantCountA;
        const vowelCountB = Array.from(b).filter(char => vowels.includes(char)).length;
        const consonantCountB = Array.from(b).filter(char => !vowels.includes(char) && /[a-zA-Z]/.test(char)).length;
        const ratioB = consonantCountB === 0 ? vowelCountB : vowelCountB / consonantCountB;
        return ratioA - ratioB;
    },
    firstWordLength: (a, b) => a.split(/\s+/)[0].length - b.split(/\s+/)[0].length,
    lastWordLength: (a, b) => a.split(/\s+/).pop().length - b.split(/\s+/).pop().length,
    upperCaseCount: (a, b) => Array.from(a).filter(char => /[A-Z]/.test(char)).length - Array.from(b).filter(char => /[A-Z]/.test(char)).length,
    lowerCaseCount: (a, b) => Array.from(a).filter(char => /[a-z]/.test(char)).length - Array.from(b).filter(char => /[a-z]/.test(char)).length,
    lexicographicWords: (a, b) => {
        const wordsA = a.split(/\s+/).sort().join(' ');
        const wordsB = b.split(/\s+/).sort().join(' ');
        return wordsA.localeCompare(wordsB);
    },
    cumulativeCharPositions: (a, b, options) => {
        const char = options.char || 'a';
        const sumA = Array.from(a).reduce((sum, c, index) => sum + (c === char ? index + 1 : 0), 0);
        const sumB = Array.from(b).reduce((sum, c, index) => sum + (c === char ? index + 1 : 0), 0);
        return sumA - sumB;
    },
    fibonacciLength: (a, b) => {
        function isFibonacci(num) {
            const isPerfectSquare = x => Number.isInteger(Math.sqrt(x));
            return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
        }
        const lengthA = a.length;
        const lengthB = b.length;
        return (isFibonacci(lengthA) ? 0 : 1) - (isFibonacci(lengthB) ? 0 : 1);
    }
};

export default sortCriteria;