import React from 'react';
import axios from 'axios';

export default function Test() {
    const handleLearnNewLesson = async () => {
        try {
            const response = await axios({
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD1-QuskHLPRez-RLdpB-ePJhVMOKyWHYQ',
                method: "post",
                data: {
                    "contents": [{
                        "parts": [{ "text": "Generate 4 English words with their meanings. Do not giv e any introduction or any conclusion" }]
                    }]
                }
            });

            // Extract API response text
            const wordsResponse = response.data.candidates[0].content.parts[0].text;
            console.log(wordsResponse)

            const words = [];
        const meanings = [];

        // Split the response into lines
        const lines = wordsResponse.trim().split('\n');
        lines.forEach(line => {
            const match = line.match(/^(.*?):\s+(.*)/);
            if (match) {
                words.push(match[1]); // Add the word to the words array
                meanings.push(match[2]); // Add the meaning to the meanings array
            }
        });

        console.log('Words:', words);
        console.log('Meanings:', meanings);

            // Initialize arrays for parsed data
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLearnNewLesson}>Test</button>
        </div>
    );
}
