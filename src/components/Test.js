import React, { useState, useRef } from 'react';

const Speech = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!recognitionRef.current) {
      // Initialize SpeechRecognition
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US'; // Set language
      recognition.interimResults = true; // Get real-time results
      recognition.continuous = true; // Keep listening until stopped

      recognition.onstart = () => {
        setIsListening(true);
        setText('Listening...');
      };

      recognition.onresult = (event) => {
        let newText = '';
        for (let i = 0; i < event.results.length; i++) {
          newText += event.results[i][0].transcript + ' ';
        }
        setText(newText.trim());
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    // Start speech recognition
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Speech to Text Converter</h1>
      <div className="flex space-x-4">
        <button
          onClick={startListening}
          disabled={isListening}
          className={`px-6 py-2 rounded-md text-white font-semibold ${
            isListening ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          Start
        </button>
        <button
          onClick={stopListening}
          disabled={!isListening}
          className={`px-6 py-2 rounded-md text-white font-semibold ${
            !isListening ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          Stop
        </button>
      </div>
      <div className="mt-6 p-4 border rounded-md shadow bg-white w-2/3 text-center text-gray-700">
        <p className="text-xl whitespace-pre-wrap">{text || 'Your speech will appear here.'}</p>
      </div>
    </div>
  );
};

export default Speech;

