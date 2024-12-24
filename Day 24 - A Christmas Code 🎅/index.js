import { codedMessage } from './codedMessage.js';

// Decode the binary message to ASCII characters
const rawAsciiChars = codedMessage
  .map((binary) => String.fromCharCode(parseInt(binary, 2)))
  .join('');

// Apply substitution based on key.md
const decodedMessage = codedMessage
  .map((binary) => {
    let ascii = parseInt(binary, 2) - 10; // Shift ASCII value by 10
    if (ascii < 32) {
      ascii = 128 - (32 - ascii); // Wrap around if below printable range
    }
    return String.fromCharCode(ascii);
  })
  .join('');

// Log results to the console
// console.log('Raw ASCII Message:', rawAsciiChars);
console.log('Decoded Message:', decodedMessage);
