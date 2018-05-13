import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { PlayQuizz } from './components/PlayQuizz';
import { ManageQuestions } from './components/ManageQuestions';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={ FetchData } />
    <Route path='/playquizz' component={ PlayQuizz } />
    <Route path='/managequestions' component={ ManageQuestions } />
</Layout>;
