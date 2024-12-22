import React, { useState } from 'react';
import Navbar from './Navbar'; // Reuse Navbar component
import axios from 'axios';

function Vocabulary() {

    let [lesson_number , setnumber] = useState(0)
  const [lessons, setLessons] = useState([
    

  ]);
//   const [newLesson, setNewLesson] = useState('');

  const handleLearnNewLesson =  () => {
    setnumber((e)=>e+1)
    setLessons([...lessons, `lesson  ${lesson_number}`]);  
  };

  return (
    <>
      <Navbar title="Vocabulary" />
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* First Half */}
        <div className="w-full md:w-1/2 bg-blue-50 p-8 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Vocabulary Lessons</h1>
          <p className="text-lg text-gray-700 text-center">
            Improve your English vocabulary through interactive lessons powered by AI.
          </p>
        </div>

        {/* Second Half */}
        <div className="w-full md:w-1/2 bg-gray-100 p-8">
          <h2 className="text-2xl font-semibold mb-4">Lesson List</h2>
          <ul className="space-y-3 mb-6">

            {/* PRINTS THE LESSON */}

            {lessons.map((lesson, index) => (
              <button button
                key={index}
                className="bg-white shadow-md rounded-md p-4 m-4 border border-gray-200"
              >
                {lesson}
              </button>
            ))}
          </ul>
          <button
            onClick={handleLearnNewLesson}
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Learn New Lesson
          </button>

          {/* {newLesson && (
            <div className="mt-4 p-4 bg-green-100 border border-green-500 rounded-md">
              <h3 className="font-bold text-green-800">New Lesson:</h3>
              <p className="text-green-700">{newLesson}</p>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}

export default Vocabulary;
