import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import CommunityList from './CommunityList';
import AuthenticationCallback from './authenticationCallback';

import { AuthenticationService } from '../common/authentication';

const authService = new AuthenticationService();

const Root = () => (
    <Router>
        <App authService={authService}>
            <Route exact path="/" render={(props) => {
                return <CommunityList authService={authService} />
            }}/>

            <Route path="/auth-callback" render={(props) => {
                return <AuthenticationCallback authService={authService} />
            }} />
        </App>
    </Router>
);

export default Root;
