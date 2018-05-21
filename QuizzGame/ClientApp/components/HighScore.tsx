import * as React from 'react';
import { RouteComponentProps } from 'react-router';

let userName = document.getElementById('react-app')!.textContent;

console.log('userName: ' + userName)


export class HighScore extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <header>
                <h1>Highscore</h1>
            </header>

            


        </div>;
    }
}


