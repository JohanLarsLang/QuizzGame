import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <div className="jumbotron">
                <h1>Quizz Game</h1>
            </div>

            <div className="welcome">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h2>Welcome to Quizz Game</h2><span className="additional">Do you belive you can answer correct to the quizz questions...?</span>
                <br />
                <br />
                <br />
                <h2>Play Quizz Game...</h2><span className="additional">Challenge yourself!</span>

            </div>


        </div>;
    }
}
