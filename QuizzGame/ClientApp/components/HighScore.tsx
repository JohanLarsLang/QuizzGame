import * as React from 'react';
import { RouteComponentProps } from 'react-router';

let userName = document.getElementById('recat-app')!.textContent;


export class HighScore extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <header>
                <h1>Highscore</h1>
            </header>

            


        </div>;
    }
}


