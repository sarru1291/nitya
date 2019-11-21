pragma solidity >=0.4.22 <0.6.0;
// pragma experimental ABIEncoderV2;
contract Nitya{
    enum Status { Pending, Accepted, Resolved, Proposed }

    address superuser;
    struct Complaint{
        string _data; 
        address _personID;
        Status status;
        string _forensic_data;
    }
    
    mapping(uint=>Complaint) private complaints;
    uint complaintCount;
    constructor() public {
        superuser = msg.sender;
        complaintCount=0;
    }
    
    modifier onlySuperuser() {
    require(msg.sender == superuser);
    _;
    }
    
    modifier onlyPerson(){
        require(msg.sender!=superuser);
        _;
    }
    
    function getSuperuserAddress() public view returns(address){
        return superuser;
    }
    
    function writeComplaint(string memory data) public onlyPerson {
        complaintCount++;
        complaints[complaintCount]=Complaint(data,msg.sender,Status.Pending,'');
    }
    
    function getComplaints(uint cid) public  view returns(string memory,address,Status,string memory){
            return (complaints[cid]._data,complaints[cid]._personID,complaints[cid].status,complaints[cid]._forensic_data);
    }
    
    function updateStatus(uint cid) public onlySuperuser{
        complaints[cid].status=Status.Accepted;
    }
    
    function checkStatus(uint cid) public onlySuperuser view returns(Status){
        return complaints[cid].status;
    }
    
}