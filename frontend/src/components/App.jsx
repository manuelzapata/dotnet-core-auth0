import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Header } from 'semantic-ui-react';

class App extends Component {

  isAuthResponse() {
    const { location } = this.props;
    const result = location.pathname.includes('callback') && location.hash.includes('access_token');
    return result;
  }

  render() {

    const { authService, children } = this.props;

    if(this.isAuthResponse() || authService.isAuthenticated()) {

      return (
          <div className="container">
            <Header as="h1">List of Communities</Header>
            {children}
          </div>
      );

    } 
    authService.login();
  }
}

export default withRouter(App);
