import React from 'react'
import axios from 'axios';
export default function Test() {
    const handleLearnNewLesson = async () => {

        const response = await axios({
            // Replace your API key 
            url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD1-QuskHLPRez-RLdpB-ePJhVMOKyWHYQ',

            method: "post",
            data: {
                "contents": [{
                    "parts": [{ "text": "Generate 4 English words with their meanings. For each word, provide 4 sentences: 1 correct and 3 incorrect." }]
                }]
            }

        });

        console.log(response)

    }
    return (
        <div>
            <button onClick={handleLearnNewLesson} > test</button>
        </div>
    )

}
