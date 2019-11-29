import React, { useContext, useState } from "react";
import { User } from "../../context/user.context";
import './registerComplaint.scss'
export default function RegisterComplaint() {
  const { web3, accounts, contract } = useContext(User);
    const [name, setName] = useState(null);
    const [gender, setGender] = useState(null);
    const [addr, setAddr] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [email, setEmail] = useState(null);
    const [subject, setSubject] = useState(null);
    const [description, setDescription] = useState(null);

//   const getComplaint = async () => {
//     try {
//       console.log(await contract.methods.getComplaints(complaintIndex).call());
//     } catch (error) {
//       console.error(error);
//     }
//   };
  const registerComplaint = async () => {
    // console.log(accounts[0]);

    try {
      await contract.methods
        .registerComplaint(name,gender,addr,mobile,email,subject,description)
        .send({ from: accounts[0] });

      // window.location.reload();
      alert("complaint stored");
    } catch (error) {
      // window.location.reload();
      alert("error found");
      console.error(error);
    }
  };
  return (
    <div>
      <div className="reg_form">
              <div>
                  complainant info
        name: <input
          type="text"
          onChange={e => {
            setName(e.target.value);
          }}
          /><br />
            gender:  <input
                  type="text"
                  onChange={e => {
                      setGender(e.target.value);
                  }}
          /><br />
                  address: <input
                  type="text"
                  onChange={e => {
                      setAddr(e.target.value);
                  }}
          /><br />
                  mobile: <input
                  type="text"
                  onChange={e => {
                      setMobile(e.target.value);
                  }}
          /><br />
                  email: <input
                  type="text"
                  onChange={e => {
                      setEmail(e.target.value);
                  }}
                  />
                  </div>
                      <div>
                          complain info
                         Subject:  <input
                              type="text"
                              onChange={e => {
                                  setSubject(e.target.value);
                              }}
          /> <br />
          Description: <input
                              type="text"
                              onChange={e => {
                                  setDescription(e.target.value);
                              }}
                          /> 
                      </div>
        <br />
      </div>

      <button onClick={registerComplaint}>register complaint</button>
      {/* <input
              type="text"
              onChange={e => {
                  setComplaintIndex(e.target.value);
              }}
          /> */}
      {/* <button onClick={getComplaint}>get complaints</button> */}
    </div>
  );
}
