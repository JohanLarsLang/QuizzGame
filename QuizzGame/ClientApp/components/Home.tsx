import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

let userName = document.getElementById('react-app')!.textContent;

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
                 <header>
                    <h1>Quizz Game</h1>
                </header>
          

            <div className="welcome">
                <br />
                <br />
                Hello {userName}!
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h2>Welcome to Quizz Game</h2><span className="additional">Do you belive you can answer correct to these questions...?</span>
                <br />
                <br />
                <br />
                <NavLink to={'/playquizz'} activeClassName='active'><h2><i className='glyphicon glyphicon-play' />  Play Quizz Game...</h2><span className="additional">Challenge yourself!</span>
                            </NavLink>

                

            </div>


        </div>;
    }
}
