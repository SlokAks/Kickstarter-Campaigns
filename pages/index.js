import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from '../ethereum/factory';
import Layout from "../components/Layout";

class CampaignIndex extends Component {

    // In NextJS only
    // Static -> Assigned to class itself
    static async getInitialProps() {  
         
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return { campaigns };
        // Same as return { campaigns: campaigns };
    }
 
    renderCampaigns() {
        // like for loop - object based
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            };
        });
        
        return <Card.Group items = {items} />;
    }
    
    render() {
        return (
        <Layout>
            <div>
                <h3>Open Campaigns</h3>
                <Button
                    floated="right"
                    content="Create Campaign"
                    icon="add circle"
                    primary //Same as primary={true}
                />

                {this.renderCampaigns()}
            </div>
        </Layout>
        );
    }
}

export default CampaignIndex;
