pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;
contract Nitya{

    struct Complainant{
        address id;
        string name;
        string gender;
        string addr;
        string mobile;
        string email;
    }
    struct Complaint{
        address complainantID;
        string subject;
        string description;
        string status;
    }
    struct Agency{
        address id;
        string name;
        string location;
    }
    mapping(uint=>Complaint) private complaints;
    mapping(uint=>Agency) private agencies;
    mapping(uint=>Complainant) private complainants;
    uint complaintCount;
    uint complainantCount;
    uint agencyCount;
    address admin;
    constructor() public {
        admin = msg.sender;
        complaintCount=0;
        complainantCount=0;
    }
    
    modifier onlyadmin() {
    require(msg.sender == admin);
    _;
    }
    function parseAddr(string memory _a) internal pure returns (address _parsedAddress) {
    bytes memory tmp = bytes(_a);
    uint160 iaddr = 0;
    uint160 b1;
    uint160 b2;
    for (uint i = 2; i < 2 + 2 * 20; i += 2) {
        iaddr *= 256;
        b1 = uint160(uint8(tmp[i]));
        b2 = uint160(uint8(tmp[i + 1]));
        if ((b1 >= 97) && (b1 <= 102)) {
            b1 -= 87;
        } else if ((b1 >= 65) && (b1 <= 70)) {
            b1 -= 55;
        } else if ((b1 >= 48) && (b1 <= 57)) {
            b1 -= 48;
        }
        if ((b2 >= 97) && (b2 <= 102)) {
            b2 -= 87;
        } else if ((b2 >= 65) && (b2 <= 70)) {
            b2 -= 55;
        } else if ((b2 >= 48) && (b2 <= 57)) {
            b2 -= 48;
        }
        iaddr += (b1 * 16 + b2);
    }
    return address(iaddr);
}
    function getAdminAddress() public view returns(address){
        return admin;
    }
    
    function registerComplaint( string memory name, string memory gender,string memory addr,string memory mobile,string memory email,string memory subject, string memory description) public {
        complaintCount++;
        complainantCount++;
        complainants[complainantCount]=Complainant(msg.sender,name,gender,addr,mobile,email);
        complaints[complaintCount]=Complaint(msg.sender,subject,description,'Pending');
    }
    
    function getComplaints(uint cid) public  view returns(address,string memory,string memory,string memory){
            return (complaints[cid].complainantID,complaints[cid].subject,complaints[cid].description,complaints[cid].status);
    }
    
    function verifyAgency(string memory id,string memory name, string memory location) public onlyadmin {
        agencyCount++;
        agencies[agencyCount]=Agency(parseAddr(id),name,location);
    }
    
    function getAgencies(uint cid) public view returns(address,string memory,string memory) {
        return (agencies[cid].id,agencies[cid].name,agencies[cid].location);
    }
    
    // function updateStatus(uint cid) public {
    //     complaints[cid].status=Status.Accepted;
    // }
    
    // function checkStatus(uint cid) public  view returns(Status){
    //     return complaints[cid].status;
    // }
    
}