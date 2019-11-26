import React, { Component } from "react";
import NityaContract from "./contracts/Nitya.json";
import getWeb3 from "./getWeb3";
import Navbar from "./components/navbar/navbar";
import ServiceButton from "./components/services/serviceButton/serviceButton.js";
import "./App.scss";
class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    complaintData: null,
    complaintIndex: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = NityaContract.networks[networkId];
      const instance = new web3.eth.Contract(
        NityaContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  storeComplaintData = e => {
    // console.log(e.target.value);
    this.setState({ complaintData: e.target.value });
  };
  storeComplaintIndex = e => {
    // console.log(e.target.value);
    this.setState({ complaintIndex: e.target.value });
  };
  getComplaint = async () => {
    try {
      const { contract,complaintIndex } = this.state;

      console.log(await contract.methods.getComplaints(complaintIndex).call());
    } catch (error) {
      console.error(error);
    }
  };
  storeComplaint = async () => {
    // console.log(this.state.complaintData);

    try {
      const { accounts, contract, complaintData } = this.state;
      // console.log(complaintData);

      await contract.methods
        .writeComplaint(complaintData)
        .send({ from: accounts[0] });
    } catch (error) {
      alert("you are not authorised to write complaints");
      console.error(error);
    }
  };

  s_btn_action(option) {
    switch (option) {
      case "register":

        console.log(option);
        break;
      case "check":

        console.log(option);
        break;
      default:
        break;
    }
    
  }
  render() {
    if (!this.state.web3) {
      return (<>
        <Navbar></Navbar>
        <div>You need to login using metamask.</div>
      </>);
    }
    return (
      <div className="App">
        <Navbar></Navbar>
        <p>Your address: {this.state.accounts[0]}</p>
        <div className="services">
          <div>
            <ServiceButton
              name="Register Complaint"
              id="register"
              s_btn_action={option => this.s_btn_action(option)}
            >
              <i class="fa fa-edit" />
            </ServiceButton>
          </div>
          <div>
            <ServiceButton
              name="Check Complaint/Report Status"
              id="check"
              s_btn_action={option => this.s_btn_action(option)}
            >
              <i class="fa fa-search" />
            </ServiceButton>
          </div>
        </div>
        
        {/* <input
          type="text"
          onChange={e => {
            this.storeComplaintData(e);
          }}
        />
        <button onClick={this.storeComplaint}>store complaint</button>
        <br />
        <input
          type="text"
          onChange={e => {
            this.storeComplaintIndex(e);
          }}
        />
        <button onClick={this.getComplaint}>get complaints</button> */}
      </div>
    );
  }
}

export default App;
