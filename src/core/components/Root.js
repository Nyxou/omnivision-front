// @flow
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as coreConstants from '../constants';
import { store } from '../store';
import App from './App';
import Error404 from './Error404';
import HomePage from '../../home/components/HomePage';
import Calendar from '../../calendar/components/Calendar';
// import { Projects, Project } from '../../project/components';
import Projects from '../../project/components/Projects';
import Project from '../../project/components/Project';

import '../styles/index.scss';

type Props = {};

type State = {};

const { ROUTING } = coreConstants;

class Root extends PureComponent<Props, State> {
  render = () => (
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Switch>
            <Route exact path={ROUTING.DEFAULT.PATH} component={HomePage} />
            <Route path={ROUTING.CALENDAR.PATH} component={Calendar} />
            <Route path={ROUTING.PROJECTS.PATH} component={Projects} />
            <Route path={ROUTING.PROJECT.PATH} component={Project} />
            <Route component={Error404} />
          </Switch>
        </App>
      </BrowserRouter>
    </Provider>
  )
}

export default Root;
