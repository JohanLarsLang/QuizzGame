//Johan Lång
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IHighScoreProps {
}

interface IHighScoreState {
    question: questionInfo[];
    allQuestionInfo: string;
}

interface questionInfo {
    id: number;
    email: string;
    timestamp: string;
    totalScore: number;

}


export class HighScore extends React.Component<RouteComponentProps<IHighScoreProps>, IHighScoreState> {
    public constructor(props: RouteComponentProps<IHighScoreProps>) {
        super(props);
        this.state = {
            question: [],
            allQuestionInfo: "",
        };

        this.showAllQuestions = this.showAllQuestions.bind(this);
    }
    public render() {
        let question = this.state.question;
        let oldlist = question.map(q => q.totalScore + ', ' + q.timestamp.slice(0, 10) + ', ' + q.email);
        let list = oldlist.map((x, index) =>
            <li className="list-group-item" key={x + ':' + index}>{x}</li>);

        return <div>
            <header>
                <h1>Highscore</h1>
            </header>
            <br />
            <br />
            <br />
            <br />
            <div className="list">
                {this.state.allQuestionInfo}
                <br />
                <ol className="list-group">{list}</ol>
            </div>

        </div>
    }

   showAllQuestions() {

       fetch('api/GetHighScores')

            .then(data => {
                console.log('All HighScore Data: ', data);
                return data.json();
            })
           .then(obj => {
               console.log('All Question json: ', obj);
                this.setState({
                    question: obj,
                    allQuestionInfo: "Total score, Timestamp, Email"
                });
                
            })
        }


    componentDidMount() {
      this.showAllQuestions();
    }
}


