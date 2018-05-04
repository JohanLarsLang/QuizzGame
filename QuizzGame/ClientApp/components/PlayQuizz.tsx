// Johan Lång
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IPlayQuizzProps {
    setActualQuestionCorrect: boolean;
}

interface IPlayQuizzState {
    actualQuestion: string;
    actualQuestionEng: string;
    actualQuestionSwe: string;
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
            actualQuestion: "",
            actualQuestionEng: "",
            actualQuestionSwe: "",
            actualQuestionScore: 0,
            actualQuestionCorrect: false,
            actualAnswer: false,
            countQuestion: 1,
            hasFetchedData: false
        };

        this.handleQuizzQuestion = this.handleQuizzQuestion.bind(this);


    }
    public render() {


        return <div>
            <h1>Welcome to Quizz Game!</h1>

            <div className="NewQuestion">


                <br />
                Question {this.state.countQuestion - 1}:
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

                Click here for question:
            <button onClick={this.handleQuizzQuestion}>New Question</button>
                <button>Cancel</button>
            </div>




        </div>;
    }

    handleQuizzQuestion(event: any) {

        fetch('api/Questions/' + this.state.countQuestion)
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
        this.handleQuizzQuestion(1);
    }
}


