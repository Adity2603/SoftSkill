import React, { useState } from 'react';
import Navbar from './Navbar'; // Reuse Navbar component
import axios from 'axios';

function Vocabulary() {
    const [words, setWords] = useState([]); // Stores words
    const [meanings, setMeanings] = useState([]); // Stores meanings
    const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current word index
    const [lessonCompleted, setLessonCompleted] = useState(false); // Tracks if the lesson is completed
    const [isSentence, setIsSentence] = useState(false); // Check for Suggested Sentence 
    const [suggestedSentence, setsuggestedSentence] = useState() // Input for Suggested Sentence
    const [userSentence, setUserSentence] = useState() // User Given Sentence
    const [feedbackAnswer, setFeedback] = useState() // Feedback given by AI

    //  TO store the Sentence in the Variable from Input Field 
    const HandleUserSentence = (e) => {

        setUserSentence(e.target.value)
    }

    // To Give the Feedback to the User to the Sentence he written

    const CheckUserSentence = async (sentence, latestWord) => {

        try {
            const feedbackResponse = await axios({
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD1-QuskHLPRez-RLdpB-ePJhVMOKyWHYQ',
                method: "post",
                data: {
                    "contents": [{
                        "parts": [{ "text": `You have this word "${latestWord}" and one of the learning user has tried to form a sentence using this word. Sentence is "${sentence}" check if the sentence is correct if it is correct Acknowledge it and if improvement require suggest user about it. If Sentence is not proper or any other text is give which is not related to word Politely ask them to give proper sentence also suggest them a sentence using that word. ` }]
                    }]
                }
            });

            // console.log(`${currentWord} :- ${wordSentence.data.candidates[0].content.parts[0].text} `)
            setFeedback(`${feedbackResponse.data.candidates[0].content.parts[0].text} `)


        }
        catch (error) {
            console.error('Error fetching data:', error);
            alert(`Error ${error} or API Limit Reach`)
        }



    }

    // TO Learn New Words *** Most Important Function do not touch unless required ***

    const handleLearnNewLesson = async () => {
        try {
            const response = await axios({
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD1-QuskHLPRez-RLdpB-ePJhVMOKyWHYQ',
                method: "post",
                data: {
                    "contents": [{
                        "parts": [{ "text": `Generate 4 English words with their meanings Other than ${words}. Do not give any introduction or any conclusion.` }]
                    }]
                }
            });

            // Extract API response text
            const wordsResponse = response.data.candidates[0].content.parts[0].text;
            console.log(wordsResponse);

            // Initialize arrays for parsed data
            const newWords = [];
            const newMeanings = [];

            // Split the response into lines
            const lines = wordsResponse.trim().split('\n');
            lines.forEach(line => {
                const match = line.match(/^(.*?):\s+(.*)/);
                if (match) {
                    newWords.push(match[1]); // Add the word to the words array
                    newMeanings.push(match[2]); // Add the meaning to the meanings array
                }
            });

            setWords(newWords);
            setMeanings(newMeanings);
            setCurrentIndex(0); // Reset the index
            setLessonCompleted(false); // Reset lesson completion
        } catch (error) {
            console.error('Error fetching data:', error);
            alert(`Error ${error} or API Limit Reach`)
        }
    };

    // To Shift Between the Words to Next Word 

    const handleNextWord = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setLessonCompleted(true);
        }
        setIsSentence(false)
        setsuggestedSentence()
        setFeedback()
    };

    // TO Suggest the Sentence to the User of the Particular Word 

    const SuggestSentence = async (currentWord) => {

        try {
            const wordSentence = await axios({
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD1-QuskHLPRez-RLdpB-ePJhVMOKyWHYQ',
                method: "post",
                data: {
                    "contents": [{
                        "parts": [{ "text": `Give me a Simple meaningfull Sentence from word ${currentWord} other than ${suggestedSentence}.  Do not give any introduction or any conclusion.` }]
                    }]
                }
            });

            console.log(`${currentWord} :- ${wordSentence.data.candidates[0].content.parts[0].text} `)
            setsuggestedSentence(`${wordSentence.data.candidates[0].content.parts[0].text} `)
            setIsSentence(true)

        }
        catch (error) {
            console.error('Error fetching data:', error);
            alert(`Error ${error} or API Limit Reach`)
        }
    }

    // The OutPut Starts *************************************************

    return (
        <>
            <Navbar title="Vocabulary" />
            {/* Navbar ENDS  */}

            <div className="flex flex-col md:flex-row min-h-screen">

                {/* First Half */}
                <div className="w-full md:w-1/2 bg-blue-50 p-8 flex flex-col justify-center items-center">

                    <h1 className="text-3xl font-bold mb-4">Welcome to Vocabulary Lessons</h1>
                    {words.length > 0 && !lessonCompleted && (
                        <>
                            {/* THE WORDS WILL DISPLAY HERE  */}
                            <div className="bg-white bg-opacity-75 p-6 rounded-md w-full text-center">
                                <h2 className="text-2xl font-semibold mb-2">{words[currentIndex]}</h2>
                                <p className="text-lg text-gray-700">{meanings[currentIndex]}</p>

                            </div>
                            {/* CODE TO MOVE TO THE NEXT WORD  */}
                            <div>
                                <button
                                    onClick={handleNextWord}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none m-3"
                                >
                                    Next Word
                                </button>
                                {/* AI Will suggest for sentence */}
                                <button
                                    onClick={() => (SuggestSentence(words[currentIndex]))}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none m-3"
                                >
                                    Suggest Sentence
                                </button>


                            </div>
                            {isSentence && (
                                <>
                                    <div className="bg-[#d9f99d] bg-opacity-75 p-6 rounded-md w-full text-center">{words[currentIndex]} :-  {suggestedSentence} </div>
                                </>
                            )
                            }
                            {/* USER INPUT BOX  */}
                            <div class="w-full">
                                <input class="w-full m-3  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Create your Own Sentence and Take Feedback"
                                    value={userSentence}
                                    onChange={HandleUserSentence} />

                                {userSentence == "" && (
                                    <>
                                        <button
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 w-full m-2 cursor-not-allowed "
                                        >
                                            Check for Sentence
                                        </button>
                                    </>
                                )}

                                {userSentence != "" && (
                                    <>
                                        <button
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded  w-full m-2 "
                                            onClick={() => (CheckUserSentence(userSentence, words[currentIndex]))}
                                        >
                                            Check for Sentence
                                        </button>

                                    </>
                                )}
                                {/* FEEDBACK TO THE USER  */}
                                {feedbackAnswer != "" && (
                                    <>
                                        <div className="bg-[#fef9c3] bg-opacity-75 p-6 rounded-md w-full"><h2>Feedback : </h2> {feedbackAnswer} </div>
                                    </>
                                )}

                            </div>
                        </>

                    )}


                    {lessonCompleted && (
                        <div className="bg-white bg-opacity-75 p-6 rounded-md shadow-md text-center w-full ">
                            <h2 className="text-2xl font-semibold text-green-600">Lesson Completed!</h2>
                        </div>
                    )}

                </div>


                {/* Second Half */}


                <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col justify-center items-center ">
                    <h2 className="text-2xl font-semibold mb-4">Click to Learn Vocabulary Words</h2>
                    <ul className="space-y-3 mb-6"></ul>

                    {words.length === 0 && (
                        <button
                            onClick={handleLearnNewLesson}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                        >
                            Learn Lesson
                        </button>
                    )}

                    {words.length > 0 && !lessonCompleted && (
                        <button

                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed "
                        >
                            Learn Lesson
                        </button>
                    )}

                    {lessonCompleted && (
                        <>
                            <button
                                onClick={handleLearnNewLesson}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                            >
                                Learn Lesson
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Vocabulary;
