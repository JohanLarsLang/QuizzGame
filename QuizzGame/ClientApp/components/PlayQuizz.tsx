// Johan Lång
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
    countQuestion: number;
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
            countQuestion: 1,
            hasFetchedData: false
        };

        this.startQuizzGame = this.startQuizzGame.bind(this);
        this.handleQuizzQuestion = this.handleQuizzQuestion.bind(this);
    }

    public render() {

        return <div>
            <div className="page-header">
                <h1>Play QuizzGame</h1>
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
                {this.state.actualQuestion} ({this.state.actualQuestionScore} p)
                <br />
                <br />
                <pre><input type="checkbox" name="answearTrue" value="True" onClick={this.handleQuizzQuestion} />True  <input type="checkbox" name="answearFalse" value="False" />False </pre>
                <br />
                The answer was: {this.state.actualAnswer}
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
    }

    handleQuizzQuestion(event: any) {

        fetch('api/GetQuestion/' + this.state.countQuestion)
            .then(data => {
                console.log('Get Qustion Info: ', data);
                return data.json();
            })
            .then(json => {
                this.setState({
                    actualQuestion: json.quizzEng,
                    actualQuestionScore: json.score,
                    actualQuestionCorrect: json.correct,
                    actualAnswer: false,
                    hasFetchedData: true,
                    countQuestion: this.state.countQuestion + 1
                });
                console.log('Get Question info json: ', json);
            })
    }

    componentDidMount() {
        //this.startQuizzGame(1);
        // this.handleQuizzQuestion(1);
    }
}



