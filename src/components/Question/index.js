
import Answer from '../Answer'
import { useState, useEffect } from 'react'
import './style.css'

export default function Question({ question }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    // when the user clicks 'Try again' btn, the questions are reset
    useEffect(() => {
        setSelectedAnswer(null)
    }, [question])


    return (
        <div className="Question">
            <h1 className='question-title' dangerouslySetInnerHTML={{ __html: question.questionTitle }} />
            <div className="answer-container">
                {question.answers.map((answer, i) =>
                    <Answer
                        key={i} 
                        answer={answer}
                        correctAnswer={question.correctAnswer}
                        selectedAnswer={selectedAnswer}
                        setSelectedAnswer={setSelectedAnswer}
                    />
                )}
            </div>
        
        </div>
    )
}