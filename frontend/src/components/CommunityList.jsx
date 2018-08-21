import React from 'react';
import { Card, Button } from 'semantic-ui-react';
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
                <Card key={community.communityId}>
                    <Card.Content>
                        <Card.Header>{community.name}</Card.Header>
                        <Card.Meta>Meetup</Card.Meta>
                        <Card.Description>
                            Awesome meetup.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div>
                            <Button basic color='green' onClick={() => {
                                window.open(community.url, '_blank');
                            }}>
                                View page
                            </Button>
                        </div>
                    </Card.Content>
                </Card>

            ));

            communitiesControl = (<Card.Group>{communityItems}</Card.Group>);
        }

        
        return (
            <div>
                <Button primary onClick={this.handleClick}>Get communities</Button>
                <div className="community-container">
                    {communitiesControl}
                </div>
            </div>
        );

    }
}