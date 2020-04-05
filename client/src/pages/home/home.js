import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./home.scss";
import ServiceButton from "../../components/services/serviceButton/serviceButton.js";
import { User } from "../../context/user.context";

const Home = props => {
  const { web3, accounts, contract } = useContext(User);
  console.table(accounts);
  // console.log(contract);
  

  if (!web3) {
    return (
      <>
        <div>You need to login using metamask.</div>
      </>
    );
  } else {
    return (
      <>
        {/* <p>Your address: {accounts[0]}</p> */}
        <div className="services">
          <div>
            <NavLink to="/aboutme" exact>
              <ServiceButton name="About Me">
                <i class="fa fa-user" />
              </ServiceButton>
            </NavLink>
          </div>
          <div>
            <NavLink to="/registerComplaint" exact>
              <ServiceButton name="Register Complaint">
                <i class="fa fa-edit" />
              </ServiceButton>
            </NavLink>
          </div>
          <div>
            <NavLink to="/getComplaints" exact>
              <ServiceButton name="Get Complaints">
                <i class="fa fa-search" />
              </ServiceButton>
            </NavLink>
          </div>
        </div>
      </>
    );
  }
};

export default Home;
