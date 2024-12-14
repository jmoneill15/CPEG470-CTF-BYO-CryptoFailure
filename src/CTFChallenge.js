import React, { useState, useEffect } from 'react';
import './CTFChallenge.css';
import './.hidden.js';

const CTFChallenge = () => {

  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const [flag, setFlag] = useState(''); 

  useEffect(() => {
    import('./.hidden.js')
      .then((module) => {
        setFlag(module.default);
      })
      .catch((err) => {
        console.error('Failed to load hidden flag file:', err);
      });
  }, []);

/*
  function textToHex(text) {
    let hex = "";
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const hexString = charCode.toString(16);
      const paddedHexString = hexString.padStart(2, '0'); // Ensure two-digit hex representation
      hex += paddedHexString;
    }
    return hex;
  }
*/

  function hexToText(hex) {
    let hexArray = hex.trim().split(/\s+/);  
    let text = "";
  
    for (let i = 0; i < hexArray.length; i++) {
      const hexPair = hexArray[i]; 
      
      
      if (hexPair.length === 2) {
        const charCode = parseInt(hexPair, 16); 
        text += String.fromCharCode(charCode); 
      } else {
        console.error(`Invalid hex pair: ${hexPair}`); 
      }
    }

    return text;
  }

  /* 
    this function checks to see if the submitted password is the same as what the hidden password converts to
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    const secretElement = document.getElementById('secret');
    const hexPassword = getComputedStyle(secretElement).getPropertyValue('--hidden-password').trim();

    //console.log('Hex password:', hexPassword);
    const decodedPassword = hexToText(hexPassword);

    // console.log('Decoded password:', decodedPassword);
    // console.log('user input:', userInput);
    // console.log("user input hed:", textToHex(userInput));
    // console.log("user input new hes: ", hexToText(hexPassword));

    if (userInput === decodedPassword) {
      setMessage(`Congrats! Here's your flag: ${flag}`);
    } else {
      setMessage('Wrong password. Try again!');
    }
  };

  return (
    <div>
      <h1 id="header">CTF Challenge</h1>
      <p id="text1">Enter the correct password to get the flag!</p>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter password"
        />
        <button id="button" type="submit">Submit</button>
      </form>
      <p id="text2">Hint: Some details might be styled out of view. Be careful you aren't looking at all the spaces. </p>
      <p id="message">{message}</p>
      <div id="secret"></div>
    </div>
  );
};

export default CTFChallenge;
