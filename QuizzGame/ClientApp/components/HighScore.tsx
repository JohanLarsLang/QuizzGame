import * as React from 'react';
import { RouteComponentProps } from 'react-router';

let userName = document.getElementById('react-app')!.textContent;
console.log('userName: ' + userName);

interface IHighScoreProps {
}

interface IHighScoreState {
    Higscore: HigscoreInfo[];
    allHigscoreInfo: string;
    todayDate: string;
    nrInHighScore: number;
}

interface HigscoreInfo {
    id: number;
    email: string;
    timestamp: string;
    totalScore: number;
}


export class HighScore extends React.Component<RouteComponentProps<IHighScoreProps>, IHighScoreState> {

    public constructor(props: RouteComponentProps<IHighScoreProps>) {
        super(props);
        this.state = {
            Higscore: [],
            allHigscoreInfo: "",
            todayDate: new Date().toISOString().substring(0, 10),
            nrInHighScore: 0
        };

        this.getUserNrInHighscore = this.getUserNrInHighscore.bind(this);
        this.showAllHigscores = this.showAllHigscores.bind(this);

    }
    public render() {

        let Higscore = this.state.Higscore;
        let oldlist = Higscore.map(q => q.totalScore + ', ' + q.timestamp.slice(0, 10) + ', ' + q.email);
        let list = oldlist.map((x, index) =>
            <li className="list-group-item" key={x + ':' + index}>{x}</li>);

        return <div>
            <header>
                <h1>Highscore</h1>
            </header>
            <br />
            <div className="list">
                <p>Date: {this.state.todayDate}</p>
            </div>
            <br />
            <p>{userName} is number: {this.state.nrInHighScore}!</p>
            <br />
            <div className="list">
                {this.state.allHigscoreInfo}
                <br />
                <ol className="list-group">{list}</ol>
            </div>

        </div>
    }

    showAllHigscores() {

        fetch('api/GetHighScores')

            .then(data => {
                console.log('All HighScore Data: ', data);
                return data.json();
            })
            .then(obj => {
                console.log('All Higscore json: ', obj);
                this.setState({
                    Higscore: obj,
                    allHigscoreInfo: "Total score, Timestamp, Email"
                });

            })
    }

  getUserNrInHighscore() {

      console.log('User email: ',userName)

      
      fetch('api/HighScore/CountNr?UserEmail=' + userName)

            .then(data => {
                console.log('Get CountNr data: ', data);
                let dataValue = data.json();
                console.log('DataValue: ', dataValue);
                dataValue.then(vaule => console.log('Value: ', vaule))
                return dataValue

            })
            .then(json => {
                this.setState({
                    nrInHighScore: json

                });
                console.log('Get CountNr json: ', json);

            })
    }


    componentDidMount() {
        this.getUserNrInHighscore();
        this.showAllHigscores();
    }
}


