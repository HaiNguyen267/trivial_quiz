import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Quiz from './components/Quiz'
import { createContext, useState } from 'react';

export const QuizDataContext = createContext();

function App() {

  const [quizData, setQuizData] = useState({
    questionNumber: 5,
    difficultyLevel: 'Any'
  })


  return (
    <div className="container">
      <div className="App">
        <QuizDataContext.Provider value={[quizData, setQuizData]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/quiz' element={<Quiz />} />
          </Routes>
        </QuizDataContext.Provider>
      </div>
    </div>


  );
}

export default App;
