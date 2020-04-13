import React, { useContext, useState, useEffect } from "react";
import "./accountAuthorise.scss";
import { User } from "../../context/user.context";

export default function AccountAuthorise() {
  const { web3, accounts, contract } = useContext(User);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [agency_type, setType] = useState("");
  const [assigned_person, setPerson] = useState("");
  const [agencySearch, setAgencySearch] = useState(false);
  const [location, setLocation] = useState("");
  // const [addr, setAddr] = useState("");
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
  const authoriseAccount = async () => {
    console.log(accounts[0]);

    try {
      await contract.methods
        .verifyAgency(id, name, agency_type, assigned_person, location)
        .send({ from: accounts[0] });

      if (window.confirm("account registered")) {
        window.location.reload();
      }
    } catch (error) {
      if (window.confirm("Error Found")) {
        window.location.reload();
      }
    }
  };
  if (!web3) {
    return (
      <>
        <div>You need to login using metamask.</div>
      </>
    );
  } else {
    let agency_list = allAgency.map((ag) => (
      <div>
        {ag[1]}: &nbsp;{ag[0]}
        <br />
      </div>
    ));
    // console.log(allAgency);

    return (
      <div className="auth_box">
        <div className="registered_accout_box">
          Registered accounts<br></br>
          <div className="registered_account_list">{agency_list}</div>
        </div>
        <div className="input_box">
          <div>
            <input
              type="text"
              placeholder="Enter address"
              onChange={(e) => {
                setId(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Agency Type"
              onChange={(e) => {
                setType(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Assigned Person"
              onChange={(e) => {
                setPerson(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Location"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            ></input>
          </div>

          <button onClick={authoriseAccount}>Authorise</button>
        </div>
      </div>
    );
  }
}
