import { useContext, useEffect, useState } from 'react' 
import { ScoreCountContext, ShowAnswerContext } from '../Quiz'

import './style.css'


export default function Answer({ answer, correctAnswer, selectedAnswer, setSelectedAnswer }) {

    const [score, setScore] = useContext(ScoreCountContext)
    const [showAnswer, setShowAnswer] = useContext(ShowAnswerContext)
    const [styleName, setStyleName] = useState('Answer')


    useEffect(() => {
        // when the user clicks 'Try again' btn, the questions are reset
        setStyleName('Answer')
    }, [answer])
    
    // check if the answer is selected
    useEffect(() => {
        if (answer === selectedAnswer) {
            setStyleName(styleName => styleName + ' selected')
        } else {
            setStyleName(styleName => styleName.replace(" selected", ""))
        }
    }, [selectedAnswer])

    useEffect(() => {
        console.log("here");
        // when user clicks 'Check answers' button
        if (showAnswer) {
            // display correct answer
            if (answer === correctAnswer) {
                setStyleName(styleName => styleName + ' correct')
            }

            // check if the selected answer is correct answer
            if (answer === selectedAnswer) {
                if (answer === correctAnswer) {
                    setScore(score => score + 1)
                } else {
                    setStyleName(styleName => styleName + ' wrong')
                }
            }
        } 

    }, [showAnswer])
    

    function handleClick() {
        // user is not able to click to answer after he click the 'Check answer' button
        if (showAnswer) return 
        setSelectedAnswer(answer)
    }

    

    return (
        <div className={styleName} onClick={handleClick}>
            <p className='answer-text' dangerouslySetInnerHTML={{ __html: answer }}/>
        </div>
    )
}