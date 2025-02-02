import React, { useState } from 'react';
import axios from 'axios';

export default function Test() {
  const [words, setWords] = useState([]);
  const [meanings, setMeanings] = useState([]);
  const [stories, setStories] = useState([]);
  const [userResponses, setUserResponses] = useState({});
  const [feedback, setFeedback] = useState({});
  const [currentStoryIndex, setCurrentStoryIndex] = useState(-1); // -1 indicates no story displayed yet
  const [loading, setLoading] = useState(false);

  const fetchVocabulary = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD1-QuskHLPRez-RLdpB-ePJhVMOKyWHYQ',
        method: 'post',
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Generate 4 English words with their meanings. Do not give any introduction or any conclusion.`,
                },
              ],
            },
          ],
        },
      });

      const wordsResponse = response.data.candidates[0].content.parts[0].text;
      const newWords = [];
      const newMeanings = [];
      const lines = wordsResponse.trim().split('\n');

      lines.forEach((line) => {
        const match = line.match(/^(.*?):\s+(.*)/);
        if (match) {
          newWords.push(match[1]);
          newMeanings.push(match[2]);
        }
      });

      setWords(newWords);
      setMeanings(newMeanings);

      // Generate stories
      const storiesResponse = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD1-QuskHLPRez-RLdpB-ePJhVMOKyWHYQ',
        method: 'post',
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Generate 4 short stories, each containing blanks for these words: ${newWords.join(', ')}. Each story should have one blank for each word.`,
                },
              ],
            },
          ],
        },
      });

      const storiesText = storiesResponse.data.candidates[0].content.parts[0].text;
      const storyList = storiesText.split('\n\n').map((story) => story.trim());

      setStories(storyList);
      setCurrentStoryIndex(0); // Start with the first story
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(`Error: ${error.message || 'API limit reached'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (blankIndex, value) => {
    setUserResponses((prev) => ({
      ...prev,
      [`${currentStoryIndex}-${blankIndex}`]: value,
    }));
  };

  const checkResponse = () => {
    const newFeedback = {};
    const currentWords = stories[currentStoryIndex].match(/_____/g) || [];

    currentWords.forEach((_, blankIndex) => {
      const userAnswer = userResponses[`${currentStoryIndex}-${blankIndex}`]?.trim().toLowerCase();
      const correctAnswer = words[blankIndex]?.toLowerCase();

      newFeedback[`${currentStoryIndex}-${blankIndex}`] =
        userAnswer === correctAnswer
          ? 'Correct'
          : `Incorrect. The correct word is '${words[blankIndex]}'.`;
    });

    setFeedback(newFeedback);

    // Move to the next story after feedback
    setTimeout(() => {
      setFeedback({});
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex((prev) => prev + 1);
      } else {
        alert('Test completed! Great job!');
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Vocabulary Test</h1>

      {currentStoryIndex === -1 ? (
        <button
          onClick={fetchVocabulary}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition transform duration-300"
        > 
          {loading ? 'Loading...' : 'Start Vocabulary Test'}
        </button>
      ) : (
        <div className="w-full max-w-3xl">
          <div className="mb-8 p-6 bg-white rounded-md shadow-md transition transform duration-300 hover:scale-105">
            <p className="mb-4 text-lg font-medium">
              {stories[currentStoryIndex]
                .split(' ')
                .map((word, i) =>
                  word === '_____' ? (
                    <input
                      key={`${currentStoryIndex}-${i}`}
                      type="text"
                      className="border-b-2 border-blue-400 focus:outline-none px-2 mx-1 text-blue-700"
                      value={userResponses[`${currentStoryIndex}-${i}`] || ''}
                      onChange={(e) => handleInputChange(i, e.target.value)}
                    />
                  ) : (
                    <span key={`${currentStoryIndex}-${i}`}>{word} </span>
                  )
                )}
            </p>

            {Object.keys(feedback).length > 0 && (
              <div className="mt-4 text-sm">
                {Object.keys(feedback).map((key) => (
                  <p
                    key={key}
                    className={`mb-1 ${
                      feedback[key] === 'Correct'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {`Feedback: ${feedback[key]}`}
                  </p>
                ))}
              </div>
            )}
          </div>

          {Object.keys(feedback).length === 0 && (
            <button
              onClick={checkResponse}
              className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition transform duration-300"
            >
              Submit Answer
            </button>
          )}
        </div>
      )}
    </div>
  );
}
