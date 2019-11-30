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
        string[] new_records;
        uint complaint_ref_no;
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
    uint complaint_ref_no;
    address admin;

    constructor() public {
        admin = msg.sender;
        complaintCount=0;
        complainantCount=0;
        complaint_ref_no=20190000;
    }
    
    modifier onlyadmin() {
        require(msg.sender == admin);
        _;
    }
    
    function isAuthorisedAgency(address addr) internal view returns (bool){
         for(uint i=1;i<=agencyCount;i++){
            if(agencies[i].id == addr){
                return true;
            }
        }
        return false;
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
    
    function getOwnAddress() public view returns(address){
        return msg.sender;
    }
    
    function registerComplaint( string memory name, string memory gender,string memory addr,string memory mobile,string memory email,string memory subject, string memory description) public {
        complaintCount++;
        complainantCount++;
        complaint_ref_no++;
        complainants[complainantCount]=Complainant(msg.sender,name,gender,addr,mobile,email);
        complaints[complaintCount].complainantID=msg.sender;
        complaints[complaintCount].subject=subject;
        complaints[complaintCount].description=description;
        complaints[complaintCount].status="Pending";
        complaints[complaintCount].new_records.push("Citizen registered complaint.");
        complaints[complaintCount].complaint_ref_no=complaint_ref_no;
    }
    
    function getAllComplaints() public view returns(Complaint[] memory){
        Complaint[] memory all_complaints=new Complaint[](complaintCount);
        uint count=0;
        for(uint i=1;i<=complaintCount;i++){
                all_complaints[count]=complaints[i];
                count++;
        }
        return all_complaints;
    }

    function getMyComplaints() public view returns(Complaint[] memory){
        Complaint[] memory my_complaints=new Complaint[](complaintCount);
        uint count=0;
        for(uint i=1;i<=complaintCount;i++){
            if(complaints[i].complainantID==msg.sender){
                my_complaints[count]=complaints[i];
                count++;
            }
        }
        return my_complaints;
    }
    
    function getComplaintByRef(uint rid) public view returns(Complaint memory){
        for(uint i=1;i<complaintCount;i++){
            if(complaints[i].complaint_ref_no==rid){
                return complaints[i];
            }
        }
    }
    
    function verifyAgency(string memory id,string memory name, string memory location) public onlyadmin {
        agencyCount++;
        agencies[agencyCount]=Agency(parseAddr(id),name,location);
    }
    
    function getAllAgencies() public onlyadmin view returns(Agency[] memory){
        Agency[] memory all_agencies=new Agency[](agencyCount);
        uint count=0;
        for(uint i=1;i<=agencyCount;i++){
                all_agencies[count]=agencies[i];
                count++;
        }
        return all_agencies;
    }    
    
    function updateComplaint(string memory new_data, uint rid) public {
        require(isAuthorisedAgency(msg.sender)==true);
            for(uint i=0;i<complaintCount;i++){
                if(complaints[i].complaint_ref_no==rid){
                    complaints[i].new_records.push(new_data);
                }
            }
        
    }
    
}