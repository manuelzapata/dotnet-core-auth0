import React from 'react';
import { withRouter } from 'react-router-dom';

class AuthenticationCallback extends React.Component {

    redirect() {
        debugger;
        const { authService } = this.props;
        let redirectURL = authService.getRedirectURI();

        if(!redirectURL) redirectURL = '/';

        authService.removeRedirectURI();
        this.props.history.push(redirectURL);
    }

    componentDidMount() {
        debugger;
        const { location, authService } = this.props;

        if(/access_token|id_token|error/.test(location.hash)) {
            authService.handleAuthentication()
                                    .then(
                                        () => {
                                            this.redirect();
                                        },
                                        () =>  this.redirect()
                                    );
        } else {
            this.redirect();
        }
    }

    render() {
        return (
            <div>
                Loading data...
            </div>
        );
    }
}

export default withRouter(AuthenticationCallback);