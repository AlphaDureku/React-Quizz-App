import Start from "./Start"
import {useEffect, useState} from 'react'
import Questions from "./Questions"
import axios from 'axios';

export default function Main(){
    const [state, setState] = useState(true)


    const begin=()=>{
        setState(false)
    }


    return(
        <div className="body-wrapper">
             {state && <Start start={begin}/>}
             {!state && <Questions/>}
        </div>
 
    )
}