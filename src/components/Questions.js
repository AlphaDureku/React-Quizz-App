import {useEffect, useState} from 'react'

import IndividualQuestions from './IndividualQuestions';
import Confetti from 'react-confetti'

export default function Questions(props){
    const [quiz, setQuiz] =useState([])
    const [score, setScore]=useState({score: 0, status: false})
    const [restart, setRestart]=useState(false)

        useEffect(()=>{
        async function fetchAPI(){
            setScore({score: 0, status: false})
            const data = await fetch("https://opentdb.com/api.php?amount=10&category=31&difficulty=medium&type=multiple")
            let res = await data.json()
            setQuiz(res.results)
            concatenateChoices()
        }   
        fetchAPI()
    }, [restart])
    
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
        setQuiz(prevData=>(
            prevData.map((item, index)=>{
                return {...item, question: item.question.replace("&quot;", "")}
            }))
        )
        setQuiz(prevData=>(
            prevData.map((item, index)=>{
                return {...item, question: item.question.replace("&#039;s", "")}
            }))
        )
        setQuiz(prevData=>(
            prevData.map((item, index)=>{
                return {...item, question: item.question.replace("&quot;", "")}
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
        setScore(prev=>({...prev, status: true}))
        for(let i=0; i<quiz.length; i++){
            if(quiz[i].answer === quiz[i].correct_answer){
              setScore(prevData=>({
                ...prevData, score: prevData.score + 1
              }))
              
            }
        }
    }

    function handleRestart(){

        setRestart((!restart))
    }
    let quizElements = quiz.map((items, index)=>{
        return <IndividualQuestions key={index}questions={items.question} choices={items.choices} UserAnswer ={setAnswer} id = {index} answer = {items.answer} status = {score.status} correct = {items.correct_answer}/>
    })

    return(
        <div className="question-wrapper">
             {quizElements}
             <div className='check_answer_btn-wrapper'>
             {score.status && <h1 className='score'>You scored {score.score}/{quiz.length}</h1>}
             <button className='check_answer_btn' onClick={!score.status ? checkAnswer : handleRestart}>{!score.status ? 'Check Answer' : 'Restart'}</button>
             {score.status && <Confetti height={2500}/>}
             </div>
             
        </div>
    )
}