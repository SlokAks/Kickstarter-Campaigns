import React, { Component } from "react";
import factory from '../ethereum/factory';

class CampaignIndex extends Component {

    // In NextJS only
    // Static -> Assigned to class itself
    static async getInitialProps() {  
         
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return { campaigns };
        // Same as return { campaigns: campaigns };
    }
    
    render() {
        return <div>{this.props.campaigns[0]}</div>
    }
}

export default CampaignIndex;
