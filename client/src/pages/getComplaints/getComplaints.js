import React, { useState,useContext,useEffect } from "react";
import "./getComplaints.scss";
import { User } from "../../context/user.context";

export default function GetComplaints() {
      const { web3, accounts, contract } = useContext(User);
  const [agency, setAgency] = useState(false);
    const [result_list, setResultList] = useState([]);
    // useEffect(() => {
    //   getAllComplaints(contract, accounts);
    // });
   var [allAgency, setAllAgency] = useState([]);
   useEffect(() => {
     getAllAgencies(contract, accounts);
   });
   const getAllAgencies = async (contract, accounts) => {
     //  console.log(accounts[0]);

     try {
       let allAgencies = [];
       allAgencies = await contract.methods
         .getAllAgencies()
         .call({ from: accounts[0] });
       //  console.log(allAgencies);
       setAllAgency(allAgencies);
     } catch (error) {
       console.log("Agencies—error");
     }
   };
  for (let i = 0; i < allAgency.length; i++) {
    if (accounts[0] == allAgency[i]) {
      setAgency(true);
      break;
    }
    
  }
    const getAllComplaints = async () => {
      //  console.log(accounts[0]);

      try {
        let allComplaints = [];
        allComplaints = await contract.methods
          .getAllComplaints()
          .call({ from: accounts[0] });
        //  console.log(allComplaints);
        setResultList(allComplaints);
      } catch (error) {
        console.log("Complaints—error");
      }
    };
  let edit_button;
  if (agency) {
    edit_button = <button>Update Status</button>;
  } 
  let result_lists = result_list.map((comp,index) => {
    console.log(comp);
    return (
      <div>
        <h2>{index}&nbsp;{edit_button}</h2>
        
        <b>Address:</b> {comp[0]}
        <br />
        <b>Type:</b> {comp[1]}
        <br />
        <b> Description:</b> {comp[2]}
        <br />
        <b>Status: </b >{comp[3]}
        <br />
        {comp[4]}
        <br />
        <b> Reference ID:</b > {comp[5]}
        <br />
      </div>
    );
    } );
  return (
    <div className="get_com">
      <div>
        Search: <input type="text" placeholder="Enter reference number" />{" "}
        &nbsp;<button>search</button> Or
              <button onClick={getAllComplaints}>Get all complaints</button>
      </div>
      <br />
      <br />
      <div className="results">
              Results:
        <br />
              <div className="result_list">
          <button>Update Status</button>   {result_lists}
              </div>
      </div>
    </div>
  );
}
