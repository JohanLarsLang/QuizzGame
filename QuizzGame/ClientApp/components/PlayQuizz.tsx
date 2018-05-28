// Johan Lång
//import '/css/style.css';
//     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> 

import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IPlayQuizzProps {
    setActualQuestionCorrect: boolean;
}

interface IPlayQuizzState {
    totalScore: number;
    totalNrOfQuestions: number;
    startTrue: boolean;
    actualQuestion: string;
    actualQuestionScore: number;
    actualQuestionCorrect: boolean;
    chkbox: boolean;
    actualAnswer: boolean;
    setAnswer: boolean;
    answerMessage: string;
    countQuestion: number;
    nextQuestion: boolean,
    cancelQuestion: boolean;
    resultMessage: string;
    hasFetchedData: boolean;
}


export class PlayQuizz extends React.Component<RouteComponentProps<IPlayQuizzProps>, IPlayQuizzState> {
    public constructor(props: RouteComponentProps<IPlayQuizzProps>) {
        super(props);
        this.state = {
            totalScore: 0,
            totalNrOfQuestions: 0,
            startTrue: false,
            actualQuestion: "",
            actualQuestionScore: 0,
            actualQuestionCorrect: false,
            chkbox: false,
            actualAnswer: false,
            setAnswer: false,
            answerMessage: "",
            countQuestion: 1,
            nextQuestion: false,
            cancelQuestion: false,
            resultMessage: "",
            hasFetchedData: false
        };

        this.startQuizzGame = this.startQuizzGame.bind(this);
        this.answerTrue = this.answerTrue.bind(this);
        this.answerFalse = this.answerFalse.bind(this);
        this.handleQuizzQuestion = this.handleQuizzQuestion.bind(this);
        this.cancelGame = this.cancelGame.bind(this);
        this.gameComplete = this.gameComplete.bind(this);
    }

    public render() {

        return <div>
            <header>
                <h1>Play Quizz Game</h1>
            </header>
            <br />
            <br />
            <p className="list">Select True or False for the quizz questions..</p>
            
            Click here to start Quizz Game:
            <br />
            <button className="btn btn-primary btn-lg" disabled={this.state.startTrue} onClick={this.startQuizzGame}><i className="glyphicon glyphicon-play-circle"></i> Start Quizz Game</button>
            <br />
            <br />

            <div className="NewQuestion">
                <br />
                Question {this.state.countQuestion} ({this.state.totalNrOfQuestions}):
                <br />
                <br />
                {this.state.actualQuestion} ({this.state.actualQuestionScore} p)
                <br />
                <br />
                <pre>
                    <input type="checkbox" checked={this.state.chkbox} disabled={!this.state.setAnswer} onChange={this.answerTrue} /> True  <input type="checkbox" checked={this.state.chkbox} disabled={!this.state.setAnswer} onClick={this.answerFalse} /> False
                </pre>
                <br />
                Your answer: {this.state.answerMessage}
                <br />
                <br />
                Total score: {this.state.totalScore}
                <br />
                <br />

                Click here for next question or cancel:
                 <br />
                <br />
                <button className="btn btn-primary btn-lg" disabled={!this.state.nextQuestion} onClick={this.handleQuizzQuestion}><i className="glyphicon glyphicon-forward"></i> Next Question</button> <button className="btn btn-warning btn-lg" disabled={!this.state.cancelQuestion} onClick={this.cancelGame}><i className="glyphicon glyphicon-remove"></i> Cancel</button>
                <br />
                <br />
                {this.state.resultMessage}
            </div>
        </div>;
    }


    startQuizzGame(event: any) {

        this.setState({
            countQuestion: 1,
            cancelQuestion: true,
            startTrue: true,
            setAnswer: true,
            resultMessage: ""
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

        this.handleQuizzQuestion(1);
    }

    answerTrue(event: any) {

        this.setState({
            hasFetchedData: false,
            setAnswer: false,
            actualAnswer: true

        })

        if (!this.state.actualAnswer && this.state.actualQuestionCorrect) {
            this.setState({
                answerMessage: "It's Correct!",
                totalScore: this.state.totalScore + this.state.actualQuestionScore
            })
        }
        else {
            this.setState({
                answerMessage: "It is not correct!"
            })
        }

        if (this.state.countQuestion > this.state.totalNrOfQuestions) {
            this.gameComplete();
        }

        if (this.state.countQuestion == this.state.totalNrOfQuestions) {
            this.gameComplete();
        }
        else {
            this.setState({
                nextQuestion: true,
                countQuestion: this.state.countQuestion + 1
            })
        }

    }

    answerFalse(event: any) {

        this.setState({
            hasFetchedData: false,
            setAnswer: false,
            actualAnswer: false
        })

        if (this.state.actualAnswer && !this.state.actualQuestionCorrect) {
            this.setState({
                answerMessage: "It's Correct!",
                totalScore: this.state.totalScore + this.state.actualQuestionScore
            })
        }
        else {
            this.setState({
                answerMessage: "It is not correct!"
            })
        }

        if (this.state.countQuestion == this.state.totalNrOfQuestions) {
            this.gameComplete();
        }
        else {
            this.setState({
                nextQuestion: true,
                countQuestion: this.state.countQuestion + 1
            })
        }
    }

    handleQuizzQuestion(event: any) {

        /*
                       fetch('api/GetQuestionInfo?currentId=' + this.state.countQuestion)
                   .then(response => {
                       response.text().then(text => console.log(`Received text from server: "${text}"`));
                   });
       */

        this.setState({
            answerMessage: "",
            setAnswer: true,
            chkbox: false
        })

        fetch('api/GetQuestionInfo?currentId=' + this.state.countQuestion)
            .then(data => {
                console.log('Get Qustion Info: ', data);
                return data.json();
            })
            .then(json => {
                this.setState({
                    hasFetchedData: true,
                    actualQuestion: json.quizzEng,
                    actualQuestionScore: json.score,
                    actualQuestionCorrect: json.correct,
         
                });
                console.log('Get Question info json: ', json);
            })
          
        this.setState({

            nextQuestion: false
        })

        /*

        if (!this.state.hasFetchedData) {
            this.setState({
                countQuestion: this.state.countQuestion + 1
            });

            this.handleQuizzQuestion(1);
        }
        */
    }

    cancelGame(event: any) {

        this.setState({
            startTrue: false,
            countQuestion: 1,
            actualQuestion: "",
            totalScore: 0,
            answerMessage: "",
            setAnswer: false,
            chkbox: false,
            nextQuestion: false,
            actualQuestionScore: 0,
            cancelQuestion: false
        })

    }

    gameComplete() {

        this.setState({
            startTrue: false,
            cancelQuestion: false,
            resultMessage: "Congratulations! You got: " + this.state.totalScore + " score!. Press Start Quizz Game to play again..."

        })

    }

    componentDidMount() {
        //this.startQuizzGame(1);
        // this.handleQuizzQuestion(1);
    }
}



