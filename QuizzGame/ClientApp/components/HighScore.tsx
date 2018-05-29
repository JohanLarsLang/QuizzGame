//Johan Lång
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

//let userName = document.getElementById('react-app')!.textContent;
//console.log('userName: ' + userName);

interface IHighScoreProps {
}

interface IHighScoreState {
    Higscore: HigscoreInfo[];
    allHigscoreInfo: string;
    todayDate: string;
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
            todayDate: new Date().toISOString().substring(0, 10)
        };

        //this.getTodayDate = this.getTodayDate.bind(this);
        // this.getUserNrInHighscore = this.getUserNrInHighscore.bind(this);
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
            <br />
            <div className="list">
                <p>Date: {this.state.todayDate}</p>
            </div>
            <br />
            <div className="list">
                {this.state.allHigscoreInfo}
                <br />
                <ol className="list-group">{list}</ol>
            </div>

        </div>
    }
    /*
    getTodayDate() {
        let today = new Date;
        this.setState({
            todayDate: today
        });
    }
    */

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

    /*
    getUserNrInHighscore() {

        fetch('api/HighScore/CountNr?ActualUserEmail=' + userName)

            .then(data => {
                console.log('CountNr Data: ', data);
                return data.json();
            })
            .then(obj => {
                console.log('CountNr json: ', obj);
                this.setState({
                    userNrInHighScore: obj
                });

            })
    }
    */


    componentDidMount() {
        // this.getTodayDate();
        // this.getUserNrInHighscore();
        this.showAllHigscores();
    }
}


