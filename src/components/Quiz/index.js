import { useContext, useState, useEffect, createContext } from 'react'
import { QuizDataContext } from '../../App'
import Question from '../Question'
import axios from 'axios'
import './style.css'

export const ScoreCountContext = createContext()
export const ShowAnswerContext = createContext()

export default function Quiz() {
    const [quizData, setQuizData] = useContext(QuizDataContext)
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false)

    async function getQuestions() {
        const difficultyLevel = quizData.difficultyLevel === 'Any' ? '' : `&difficulty=${quizData.difficultyLevel.toLowerCase()}`
        const apiLink = `https://opentdb.com/api.php?amount=${quizData.questionNumber}${difficultyLevel}`
        const response = await axios.get(apiLink)

        const arr = response.data.results.map(question => {
            const questionTitle = question.question
            const correctAnswer = question.correct_answer
            let answers = [...question.incorrect_answers, correctAnswer]

            //shuffle the answer
            answers = answers.sort((a, b) => 0.5 - Math.random());
            return {
                questionTitle,
                correctAnswer,
                answers
            }
        })

        setQuestions(arr)

    }

    useEffect(() => {
        getQuestions()
    }, [])

    function handleCheckAnswers() {
        setShowAnswer(true)
    }

    function handleTryAgain() {
        setShowAnswer(false)
        setScore(0)
        getQuestions()
    }

    return (
        <ScoreCountContext.Provider value={[score, setScore]}>
            <div className='Quiz'>
                <ShowAnswerContext.Provider value={[showAnswer, setShowAnswer]}>
                    <ScoreCountContext.Provider value={[score, setScore]}>

                        {questions.map(question => <Question question={question} />)}
                        {questions.length > 0 && (!showAnswer ?
                        
                            <button className='check-btn' onClick={handleCheckAnswers}>Check anwers</button>
                            :
                            <div className="result">
                                <p className='result-text'>You score {score}/{questions.length} correct answers</p>
                                <button className='try-again-btn' onClick={handleTryAgain}>Try again</button>
                            </div>
                        )}

                    </ScoreCountContext.Provider>
                </ShowAnswerContext.Provider>
            </div>
        </ScoreCountContext.Provider>

    )
}