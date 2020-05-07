import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { User } from "../../context/user.context";
import "./aboutme.scss";
function Aboutme(props) {
  const { web3, accounts, contract } = useContext(User);
  const [myComplaints, setMyComplaints] = useState([]);
  // useEffect(() => {
  //   getMyComplaints(contract, accounts);
  // });
  const getMyComplaints = async () => {
    try {
      let my_complaints = [];
      setMyComplaints(my_complaints);
      my_complaints = await contract.methods
        .getMyComplaints()
        .call({ from: accounts[0] });
      // console.log(my_complaints);
      setMyComplaints(my_complaints);
      // setComplaintGet(true);
    } catch (error) {
      console.log("MyComplaints-error");
    }
  };

  if (!web3) {
    return (
      <>
        <div>You need to login using metamask.</div>
      </>
    );
  } else {
    let my_complaints = myComplaints.map((comp, ind) => {
      console.log(comp);
      if (comp[0] == "0x0000000000000000000000000000000000000000") {
        if (ind == 0) {
          return (
            <div>
              <h6>No Complaints from this Account!!</h6>
            </div>
          );
        } else {
          return <div></div>;
        }
      }
      return (
        <div>
          <h2>{ind}</h2>
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
        </div>
      );
    });
    return (
      <div className="aboutme">
        <div> Account ID: {accounts[0]}</div>
        <div>
          My Complaints:{" "}
          <button onClick={getMyComplaints}>Get My Complaints</button>{" "}
        </div>
        <div>
          list:<br></br>
          {my_complaints}
        </div>
      </div>
    );
  }
}

export default Aboutme;
