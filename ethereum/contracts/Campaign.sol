pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {

        // Deploy new contract within another contract
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    // GOCHA (solved) - manager in the Campaign contract will be the Campaign Factory in this implementation

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;

        // !!! Refactored
        mapping(address => bool) approvals; // Better name voted
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    // address[] public approvers;
    mapping(address => bool) public approvers;
    // Required as mapping cant be iterated
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;  // Fill in the blanks
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        
        // !!! Refactored
        // approvers.push(msg.sender);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) 
        public restricted {
        
        Request memory newRequest = Request ({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        // !!!BAD Practice
        // Request(description, value, recipient, false);

        // Request({arg1_key:arg1, ...}) -> Create new Request variable
        // Or, Request(arg1, arg2, ...);
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) 
    public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount/2));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}