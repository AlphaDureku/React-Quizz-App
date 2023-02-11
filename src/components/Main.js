import Start from "./Start"
import {useState, useEffect} from 'react'
import Questions from "./Questions"


export default function Main(){
    const [state, setState] = useState(true)


    const begin=()=>{
        setState(false)
    }

    useEffect(() => {
        document.title = state ? "Home" : "Quiz"
    }, [state]);

    return(
        <div className="body-wrapper">
             {state && <Start start={begin} state={state}/>}
             {!state && <Questions start={begin} state={state}/>}
        </div>
 
    )
}