import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Communities</h1>
          </header>
          <div>
            {children}
          </div>
        </div>
      );

    } 
    authService.login();
  }
}

export default withRouter(App);
