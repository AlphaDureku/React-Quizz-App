

export default function Start(props){
    return(
        <div className="start-wrapper">
            <h1 className="title">Quizzical</h1>
            <p className="description">Some Description if needed</p>
            <button className="start-btn" onClick={props.start}>Start Quiz</button>
            <div className="bg-img"></div>
        </div>
    )
}