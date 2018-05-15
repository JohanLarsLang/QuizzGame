import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class HighScore extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <div className="jumbotron">
                <h1>Quizz Game - Highscore</h1>
                <p>Where are you in the list...?</p>
            </div>

 
        </div>;
    }
}
