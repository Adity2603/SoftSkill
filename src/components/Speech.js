import React, { useState, useRef } from 'react'
import axios from 'axios';

export default function Speech () {

    const [speechFeedback, setFeedback] = useState()
    const [activeButton, setActiveButton] = useState(null); // Tracks the active button
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [userTopic, setTopic] = useState('')

    const HandleTopic = (e) => {

        setTopic(e.target.value)
    }

    const recognitionRef = useRef(null);

    const handleButtonClick = (button) => {
        setActiveButton(button);

    };

    // CODE FOR SPEECH TO TEXT CONVERT  STARTS


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
    }

    // CODE FOR SPEECH TO TEXT ENDS 


    // CODE FOR TEXT TO SPEECH

    function textToSpeech(text) {
        // Check if the browser supports speech synthesis
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance();
            speech.text = text; // Set the text to speak
            speech.lang = 'en-US'; // Set the language (default: English US)
            speech.rate = 1; // Set the speed (1 is normal speed)
            speech.pitch = 1; // Set the pitch (1 is normal pitch)
            
            // Optional: Set a voice (if available)
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                speech.voice = voices[0]; // Use the first available voice
            }
    
            // Speak the text
            window.speechSynthesis.speak(speech);
        } else {
            alert("Sorry, your browser does not support text-to-speech.");
        }
    }
    
    
    

    // CODE FOR TEXT TO SPEECH ENDS 


    // User Speech Feedback 



    const UserSpeechFeedback = async () => {

        console.log(text)


        try {

            const response = await axios({
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD1-QuskHLPRez-RLdpB-ePJhVMOKyWHYQ',
                method: "post",
                data: {
                    "contents": [{
                        "parts": [{
                            "text": `User is learning speaking lessons , user has choosen one topic and has expressed his thouhts on that topic. you have to carefully read the content and give your feedback if user has done good acknowledge him if improvement needed Give him feedback regarding gramatical , sentence formation or other as per your knowledge 
                            The Topic is ${userTopic}  
                            And his the content which user has spoke :
                            ${text} 
                            keep your feedback bit short do not make too lone also not too short make so that user can improve in him`
                        }]
                    }]
                }

            });


            setFeedback(`${response.data.candidates[0].content.parts[0].text}`)



        } catch (e) {
            alert("Error is : ", e)


        }

    }


    return (
        <>

            <div className="w-full text-2xl font-bold font-mono bg-[#ecfccb] text-center p-4  rounded ">
                LET'S LEARN HOW TO SPEAK !!!
            </div>

            <div className="min-h-screen flex bg-gray-100">
                {/* FIRST PART  */}
                <div className="w-2/3 flex flex-col items-center  bg-[#ecfeff] p-8">

                    {activeButton === 'button2' && (
                        <>
                            <div className="text-black text-3xl font-bold "> Take Any one Topic and Start Recording</div>

                            {/* TOPIC GIVEN BY THE USER  */}

                            <input className="w-full m-4  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="WRITE YOUR TOPIC HERE " value={userTopic} onChange={HandleTopic}
                            />

                            <div className='flex p-3 justify-center ' >

                                <button
                                    onClick={startListening}
                                    disabled={isListening}
                                    className={`px-6 py-2 m-4 rounded-md text-white font-semibold ${isListening ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                                        }`}
                                >
                                    Start
                                </button>
                                <button
                                    onClick={() => {
                                        stopListening()
                                        UserSpeechFeedback(text)
                                    }}
                                    disabled={!isListening}
                                    className={`px-6 py-2 m-4 rounded-md text-white font-semibold ${!isListening ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                                        }`}
                                >
                                    Stop
                                </button>

                            </div>

                            <div className="mt-6 p-4 border rounded-md shadow bg-white w-2/3 text-center text-gray-700">
                                <p className="text-xl whitespace-pre-wrap">{text}</p>
                            </div>

                            <div className="mt-6 p-4 border rounded-md shadow bg-white w-2/3 text-center text-gray-700">
                                <p className="text-xl whitespace-pre-wrap">{speechFeedback || 'You will get your feedback here'}</p>
                            </div>
                        </>
                    )}

                </div>
                {/* SECOND PART  */}
                <div className="w-1/3 flex  flex-col bg-[] p-8">
                    <button
                        className={`m-3 px-6 py-2 ${activeButton === 'button1' ? 'text-red-500 bg-white border-red-500' : 'bg-[#ef4444] text-white'
                            } rounded-md border`}
                        onClick={() => handleButtonClick('button1')}
                    >
                        Listen From AI
                    </button>
                    <button
                        className={`m-3 px-6 py-2 ${activeButton === 'button2' ? 'text-red-500 bg-white border-red-500' : 'bg-[#ef4444] text-white'
                            } rounded-md border`}
                        onClick={() => handleButtonClick('button2')}
                    >
                        Practice to Improve
                    </button>
                    <button
                        className={`m-3 px-6 py-2 ${activeButton === 'button3' ? 'text-red-500 bg-white border-red-500' : 'bg-[#ef4444] text-white'
                            } rounded-md border`}
                        onClick={() => handleButtonClick('button3')}
                    >
                        Understand Pronunciation
                    </button>
                </div>
            </div>


        </>
    )
}
