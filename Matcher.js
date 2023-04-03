function generateRegexFromString(str) {
  // Define the supported commands
  const commands = {
    startsWith: {
      pattern: '^',
      replace: (part) => part.replace(/^\s+/, ''),
    },
    endsWith: {
  pattern: '$',
  replace: (part) => part.replace(/\s+(?=[\w\d]+\@)/, '').replace(/\s+(\d|$)/, '$1'),
    },
    anyWord: {
      pattern: '\\w+',
      replace: (part) => part.replace(/^\s+|\s+$/g, ''),
    },
    anyNumber: {
      pattern: '\\d+',
      replace: (part) => part.replace(/^\s+|\s+$/g, ''),
    },
    anyCharacter: {
      pattern: '.',
      replace: (part) => part,
    },
    optional: {
      pattern: '\\?',
      replace: (part) => part,
    },
    oneOrMore: {
      pattern: '\\+',
      replace: (part) => part,
    },
    zeroOrMore: {
      pattern: '\\*',
      replace: (part) => part,
    },
  anyWhiteSpace: {
    pattern: '\\s+',
    replace: (part) => part,
  },
  anyNonWhiteSpace: {
    pattern: '\\S+',
    replace: (part) => part,
  },
  anyLetter: {
    pattern: '[a-zA-Z]',
    replace: (part) => part,
  },
  anyUpperCaseLetter: {
    pattern: '[A-Z]',
    replace: (part) => part,
  },
  anyLowerCaseLetter: {
    pattern: '[a-z]',
    replace: (part) => part,
  },
  anyDigit: {
    pattern: '\\d',
    replace: (part) => part,
  },
  anyNonDigit: {
    pattern: '\\D',
    replace: (part) => part,
  },
  anyWordBoundary: {
    pattern: '\\b',
    replace: (part) => part,
  },
  anyNonWordBoundary: {
    pattern: '\\B',
    replace: (part) => part,
  },
  anyCharacterInRange: {
    pattern: '\\[(\\w+)-(\\w+)\\]',
    replace: (part, from, to) => {
      const fromCharCode = from.charCodeAt(0);
      const toCharCode = to.charCodeAt(0);
      const chars = [];
      for (let charCode = fromCharCode; charCode <= toCharCode; charCode++) {
        chars.push(String.fromCharCode(charCode));
      }
      return `[${chars.join('')}]`;
    },
  }
  };

  // Split the string into parts to be matched exactly and parts to be pattern matched
  const parts = str.split(/\[|\]/);

  // Generate regex pattern for each part
  const regexParts = parts.map((part, index) => {
    if (index % 2 === 0) {
      // Part should be pattern matched
      // Check if part has a command
      const command = part.match(/%(\w+)/);
      if (command) {
        const commandName = command[1];
        if (commands[commandName]) {
          const commandPattern = commands[commandName].pattern;
          const commandReplace = commands[commandName].replace;
          const partWithoutCommand = part.replace(/%\w+/, '');
          return commandPattern + commandReplace(partWithoutCommand);
        } else {
          throw new Error(`Unknown command: ${commandName}`);
        }
      } else {
        // Part has no command, apply default regex pattern
        return part
          .split('')
          .map((char) => {
            if (/[a-zA-Z]/.test(char)) {
              return '\\w';
            } else {
              return '\\' + char;
            }
          })
          .join('');
      }
    } else {
      // Part should be matched exactly or replaced with \d{2} if it contains only numbers
      return /^\d+$/.test(part) ? '\\d{2}' : part.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
  });

  // Combine regex and non-regex parts
  const output = [];
  regexParts.forEach((part, index) => {
    if (index % 2 === 0) {
      // Non-regex part
      if (part) {
        output.push(part);
      }
    } else {
      // Regex part
      if (output.length > 0) {
        const lastIndex = output.length - 1;
        output[lastIndex] += part;
      } else {
        output.push(part);
      }
    }
  });

  return new RegExp(output.join(''), 'i');
}



try {
  // Example usage:
 // const str = '%anyWord[My name is] John. [I am] [29] years old.[Email]: john@example.com. [The time is] %endsWith[13]:[24]';
var str = prompt("Enter [sentence]. You can include %endsWith[commands]")
  const regex = generateRegexFromString(str);
  writeFile('text.txt', regex + '', false);
  alert(regex.toString()); // outputs: /^My \w+ is John\. I am \d{2} years old\. Email: john@example\.com\. The time is \d{2}:\d{2}$/i
} catch (err) {
  console.log(err.stack);
}
