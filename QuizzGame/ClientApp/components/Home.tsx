import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <div className="jumbotron">
                <h1>Welcome to Quizz Game!</h1>
                <p>Do you belive you can answer correct to the quizz questions...?</p>
            </div>

 
        </div>;
    }
}
