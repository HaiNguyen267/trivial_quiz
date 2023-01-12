
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { QuizDataContext } from '../../App'

import './style.css'
export default function Home() {

    const [quizData, setQuizData] = useContext(QuizDataContext)

    function handleOnChange(e) {
        const { name, value } = e.target

        setQuizData(quizData => {
            return {
                ...quizData,
                [name]: value
            }
        })
        
    }
    const difficultyLevels = ['Any', 'Easy', 'Medium', 'Hard']
    
    const navigate = useNavigate()
    return (
        <div className='Home'>
            <h1 id='heading'>Start your quiz</h1>

            <div className="form">
                <label htmlFor="question-numer">
                    <p>Question number: </p>
                    <input
                            name='questionNumber'
                            type="number" 
                            value={quizData.questionNumber} 
                            min={1}
                            onChange={handleOnChange}
                    />
                </label>

                <label htmlFor="">
                    <p>Difficulty level:</p>
                    <select name='difficultyLevel' 
                            onChange={handleOnChange}
                    >
                        {difficultyLevels.map((level, index) => 
                            <option value={level} 
                                    selected={quizData.difficultyLevel.toLowerCase() === level.toLowerCase()}
                            >
                                {level}
                            </option>
                        )}
                    </select>
                </label>

            </div>
            <button
                id='start-quiz-btn'
                onClick={() => navigate("/quiz")}>Start-quiz</button>
        </div>
    )
}