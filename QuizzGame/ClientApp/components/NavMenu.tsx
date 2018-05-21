import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

//let userName = document.getElementById('react-app')!.textContent;

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={'/'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/playquizz'} activeClassName='active'>
                                <span className='glyphicon glyphicon-play'></span> Play Quizz
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/highscore'} activeClassName='active'>
                                <span className='glyphicon glyphicon-star'></span> Highscore
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/managequestions'} activeClassName='active'>
                                <span className='glyphicon glyphicon-transfer'></span> Manage questions
                            </NavLink>
                        </li>

                    </ul>

                </div>
            </div>
        </div>;
    }
}
