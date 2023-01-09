
import { useNavigate } from 'react-router-dom'
import './style.css'
export default function Home() {
    const navigate = useNavigate()
    return (
        <div className='Home'>
            <h1 id='heading'>Start your quiz</h1>

            <div className="form">
                <label htmlFor="question-numer">
                    <p>Question number: </p>
                    <input type="number" defaultValue={5} min={1} />
                </label>
                <label htmlFor="">
                    <p>Difficulty level:</p>
                    <select>
                        <option value="any">Any</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>

            </div>
            <button
                id='start-quiz-btn'
                onClick={() => navigate("/quiz")}>Start-quiz</button>
        </div>
    )
}