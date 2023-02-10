

export default function Individual_Questions(props){

    const choicesElements=props.choices.map((items, index)=>{
        return <div key={index} className="choice" onClick={()=>props.UserAnswer(items, props.id)} style={{background: props.answer === items ? "#4d5b9e" : '', color: props.answer === items ? "white" : ''}}>{items}</div>
    })

    const choicesElements2=props.choices.map((items, index)=>{
        return <div key={index} className="choice" style={{background: props.correct === items ? '#94D7A2' : props.answer === items ? '#F8BCBC' : 'white', border: props.correct !== items ? 'none': '', color: props.correct !== items ? '#8f94af': ''}}>{items}</div>
    })
    



    return (
        <div className="indiv-question">
            <h1 className="questions">{props.id+1}. {props.questions}</h1>
            <div className="choices-flexbox">
                {!props.status ? choicesElements : choicesElements2}
            </div>
        </div>
    )
}