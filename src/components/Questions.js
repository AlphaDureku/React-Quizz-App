import {useEffect, useState} from 'react'
import axios from 'axios';
import IndividualQuestions from './IndividualQuestions';

export default function Questions(){
    const [quiz, setQuiz] =useState([])
    const [score, setScore]=useState({score: 0, status: false})
    
        useEffect(()=>{
        async function fetchAPI(){
            const data = await axios.get("https://opentdb.com/api.php?amount=10&category=31&difficulty=medium&type=multiple")
            setQuiz(data.data.results)
            concatenateChoices()
            
        }   
        fetchAPI()
    }, [])
    
    function insertRandom(array, item) {
        const randomIndex = Math.floor(Math.random() * (array.length + 1));
        array.splice(randomIndex, 0, item);
        return array;
      }

    function concatenateChoices(){
        setQuiz(prevData=>(
            prevData.map((item, index)=>{
                return {...item, choices: insertRandom(item.incorrect_answers, item.correct_answer), id: index}
            }))
        )
    }

    function setAnswer(answered, id){
        setQuiz(prevData=>(
            prevData.map((item)=>{   
                return item.id === id ? {...item, answer: answered} : item
            }))
        )
    }

    function checkAnswer(){
        for(let i=0; i<quiz.length; i++){
            if(quiz[i].answer === quiz[i].correct_answer){
              setScore({
                status: true, score: score.score + 1
              })
            }
        }
    }
    console.log(score)
    console.log(quiz)
    let quizElements = quiz.map((items, index)=>{
        return <IndividualQuestions key={index}questions={items.question} choices={items.choices} UserAnswer ={setAnswer} id = {index} answer = {items.answer} status = {score.status} correct = {items.correct_answer}/>
    })

    return(
        <div className="question-wrapper">
             {quizElements}
             <div className='check_answer_btn-wrapper'>
             {score.status && <h1 className='score'>You scored {score.score}/{quiz.length}</h1>}
             <button className='check_answer_btn' onClick={checkAnswer}>{!score.status ? 'Check Answer' : 'Restart'}</button>
             </div>
        </div>
    )
}