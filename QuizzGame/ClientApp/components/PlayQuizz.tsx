// Johan Lång
//     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> 

import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IPlayQuizzProps {
    setActualQuestionCorrect: boolean;
}

interface IPlayQuizzState {
    totalNrOfQuestions: number;
    startTrue: boolean;
    actualQuestion: string;
    actualQuestionScore: number;
    actualQuestionCorrect: boolean;
    actualAnswer: boolean;
    theAnswer: string;
    answerMessage: string;
    countQuestion: number;
    totalScore: number;
    hasFetchedData: boolean;
}


export class PlayQuizz extends React.Component<RouteComponentProps<IPlayQuizzProps>, IPlayQuizzState> {
    public constructor(props: RouteComponentProps<IPlayQuizzProps>) {
        super(props);
        this.state = {
            totalNrOfQuestions: 0,
            startTrue: false,
            actualQuestion: "",
            actualQuestionScore: 0,
            actualQuestionCorrect: false,
            actualAnswer: false,
            theAnswer: "",
            answerMessage: "",
            countQuestion: 1,
            totalScore: 0,
            hasFetchedData: false
        };

        this.startQuizzGame = this.startQuizzGame.bind(this);
        this.answerTrue = this.answerTrue.bind(this);
        this.answerFalse = this.answerFalse.bind(this);
        this.handleQuizzQuestion = this.handleQuizzQuestion.bind(this);
    }

    public render() {

        return <div>
            <div className="jumbotron">
                <h1>Play QuizzGame</h1>
                <p>Select true or false from the quizz questions..</p>
            </div>
            <br />
            Click here to start QuizzGame:
            <br />
            <button className="btn btn-primary" disabled={this.state.startTrue} onClick={this.startQuizzGame}><i className="glyphicon glyphicon-play-circle"></i> Start Quizz Game</button>
            <br />
            <br />

            <div className="NewQuestion">
                <br />
                Question {this.state.countQuestion - 1} ({this.state.totalNrOfQuestions}):
                <br />
                <br />
                {this.state.actualQuestion} ({this.state.actualQuestionScore} p Corretc answer is: {this.state.actualQuestionCorrect})
                <br />
                <br />
                <pre><input type="checkbox" disabled={!this.state.startTrue} onChange={this.answerTrue} /> True  <input type="checkbox" disabled={!this.state.startTrue} onClick={this.answerFalse} /> False </pre>
                <br />
                Your answer was: {this.state.theAnswer}, It's {this.state.answerMessage}, Counter value: {this.state.countQuestion.toString()}
                <br />
                <br />
                Total score: {this.state.totalScore}
                <br />
                <br />

                Click here for next question:
                 <br />
                <button className="btn btn-primary" disabled={!this.state.startTrue} onClick={this.handleQuizzQuestion}><i className="glyphicon glyphicon-forward"></i> Next Question</button>
                <br />
                <br />
                <button className="btn btn-warning" disabled={!this.state.startTrue}><i className="glyphicon glyphicon-remove"></i> Cancel</button>
            </div>
        </div>;
    }


    startQuizzGame(event: any) {

        this.setState({
            startTrue: true
        })

        
        fetch('api/Questions/Count')

            .then(data => {
                console.log('Get data: ', data);
                return data.json();

            })
            .then(json => {
                this.setState({
                    totalNrOfQuestions: json

                });
                console.log('Get json: ', json);

            })            

        // this.handleQuizzQuestion(1);
    }

    answerTrue(event: any) {

        this.setState({
            theAnswer: "True"
        })
    }

    answerFalse(event: any) {

        this.setState({
            theAnswer: "False"
        })
    }

    handleQuizzQuestion(event: any) {

        /*
        
        fetch('api/GetQuestionInfo?currentId=' + this.state.countQuestion)
            .then(response => {
                response.text().then(text => console.log(`Received text from server: "${text}"`));
            });

*/
        
        fetch('api/GetQuestionInfo?currentId=' + this.state.countQuestion)
          .then(data => {
                console.log('Get Qustion Info: ', data);
                return data.json();
            })
            .then(json => {
                this.setState({
                    actualQuestion: json.quizzEng,
                    actualQuestionScore: json.score,
                    actualQuestionCorrect: json.correct,
                    hasFetchedData: true,
                    countQuestion: this.state.countQuestion + 1

                });
                console.log('Get Question info json: ', json);
            })

        if (this.state.theAnswer == "True") {
                this.setState({
                    answerMessage: "Correct!"
                })
            }
            else if (this.state.theAnswer == "False") {
                this.setState({
                    answerMessage: "Not correct!"
                })
            }
        
    }

    componentDidMount() {
        //this.startQuizzGame(1);
        // this.handleQuizzQuestion(1);
    }
}



