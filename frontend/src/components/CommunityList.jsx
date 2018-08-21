import React from 'react';
import CommunityService from '../common/communityService';

export default class CommunityList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            communities: []
        };
    }

    handleClick = () => {

        const { authService } = this.props;
        const communityService = new CommunityService(authService);

        communityService.getAll().then(communities => {
            this.setState({ communities });
        });
    }

    render() {

        let communitiesControl = null;
        if(this.state.communities.length > 0) {

            const communityItems = this.state.communities.map(community => (
                <li key={community.communityId}>
                    <a href={community.url} target="_blank">{community.name}</a>
                </li>
            ));

            communitiesControl = (<ul>{communityItems}</ul>);
        }

        
        return (
            <div>
                <button onClick={this.handleClick}>Get communities</button>
                <div>
                    {communitiesControl}
                </div>
            </div>
        );

    }
}