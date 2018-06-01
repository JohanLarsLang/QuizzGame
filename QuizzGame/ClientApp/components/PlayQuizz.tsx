import * as React from 'react';
import { RouteComponentProps } from 'react-router';

let userName = document.getElementById('react-app')!.textContent;
console.log('userName: ' + userName);

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
    maxTotalScore: number;
    currentTotalScore: number;
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
            hasFetchedData: false,
            maxTotalScore: 0,
            currentTotalScore: 0
        };

        this.startQuizzGame = this.startQuizzGame.bind(this);
        this.countMaxTotalScore = this.countMaxTotalScore.bind(this);
        this.getCurrentHighscore = this.getCurrentHighscore.bind(this);
        this.answerTrue = this.answerTrue.bind(this);
        this.answerFalse = this.answerFalse.bind(this);
        this.handleQuizzQuestion = this.handleQuizzQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.cancelGame = this.cancelGame.bind(this);
        this.gameComplete = this.gameComplete.bind(this);
        this.saveHighscore = this.saveHighscore.bind(this);
    }

    public render() {

        return <div>
            <header>
                <h1>Play Quizz Game</h1>
            </header>
            <br />
            <p>{userName}, Current Highscore: {this.state.currentTotalScore}</p>
            <br />
            <p>Select True or False for the quizz questions..</p>

            <p>Click here to start Quizz Game:</p>
            <button className="btn btn-primary btn-lg" disabled={this.state.startTrue} onClick={this.startQuizzGame}><i className="glyphicon glyphicon-play-circle"></i> Start Quizz Game</button>

            <div>
                <br />
                <p> Question {this.state.countQuestion} ({this.state.totalNrOfQuestions}):</p>
                {this.state.actualQuestion} ({this.state.actualQuestionScore} p)
                <br />
                <br />
                <pre>
                    <input type="checkbox" checked={this.state.chkbox} disabled={!this.state.setAnswer} onChange={this.answerTrue} /> True  <input type="checkbox" checked={this.state.chkbox} disabled={!this.state.setAnswer} onClick={this.answerFalse} /> False
                </pre>
                <br />
                <p>Your answer: {this.state.answerMessage}</p>
                <br />
                <p>Total score: {this.state.totalScore} (Max: {this.state.maxTotalScore})</p>
                <br />

                <p>Click here for next question or cancel:</p>
                <br />
                <button className="btn btn-primary btn-lg" disabled={!this.state.nextQuestion} onClick={this.nextQuestion}><i className="glyphicon glyphicon-forward"></i> Next Question</button> <button className="btn btn-warning btn-lg" disabled={!this.state.cancelQuestion} onClick={this.cancelGame}><i className="glyphicon glyphicon-remove"></i> Cancel</button>
                <br />
                <br />
                <p>{this.state.resultMessage}</p>
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

        this.countMaxTotalScore();
        this.handleQuizzQuestion(1);
    }

    countMaxTotalScore() {

        fetch('api/HighScore/CountTotalMax')

            .then(data => {
                console.log('Get data: ', data);
                return data.json();

            })
            .then(json => {
                this.setState({
                    maxTotalScore: json

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

        if (this.state.countQuestion < this.state.totalNrOfQuestions) {
            this.setState({
                nextQuestion: true


            })
        }

        else if (this.state.countQuestion == this.state.totalNrOfQuestions) {
            this.gameComplete(this.state.totalScore);
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

        if (this.state.countQuestion < this.state.totalNrOfQuestions) {
            this.setState({
                nextQuestion: true


            })
        }
        else if (this.state.countQuestion == this.state.totalNrOfQuestions) {
            this.gameComplete(this.state.totalScore + this.state.actualQuestionScore);
        }
    }

    handleQuizzQuestion(questionNumber: number) {

        this.setState({
            answerMessage: "",
            setAnswer: true,
            chkbox: false,

        })

        fetch('api/GetQuestionInfo?currentId=' + questionNumber)
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

    }

    nextQuestion(event: any) {

        this.setState({
            countQuestion: this.state.countQuestion + 1
        });

        this.handleQuizzQuestion(this.state.countQuestion + 1);

    }

    cancelGame() {

        this.setState({
            startTrue: false,
            countQuestion: 0,
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

    gameComplete(totalScore: number) {

        this.setState({
            startTrue: false,
            cancelQuestion: false,
            resultMessage: "Congratulations! You got: " + totalScore + " score!. Press Start Quizz Game to play again..."

        })

        this.saveHighscore(totalScore)
    }

    saveHighscore(newTotalScore: number) {

        console.log('User email: ', userName)

        fetch('api/Highscore/Add?UserEmail=' + userName + '&newTotalScore=' + newTotalScore)
            .then(data => {
                console.log('Save Highscore Data: ', data);
                return data.json();
            })
            .then(obj => {
                console.log('Save Highscore json: ', obj);
            })

    }

    getCurrentHighscore() {

        console.log('User email: ', userName)

        fetch('api/HighScore/UserCurrentHigscore?UserEmail=' + userName)
            .then(data => {
                console.log('Current Highscore Data: ', data);
                return data.json();
            })
            .then(obj => {
                console.log('Current Highscore json: ', obj);
                this.setState({
                    currentTotalScore: obj


                });
            })

    }

    componentDidMount() {
        this.getCurrentHighscore();
    }
}



