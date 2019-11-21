import React, { Component } from "react";
import NityaContract from "./contracts/Nitya.json";
import getWeb3 from "./getWeb3";
import Navbar from './components/navbar/navbar';
import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null,complaintData:null };

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
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  storeComplaintData=(e)=> {
    // console.log(e.target.value);
    this.setState({complaintData:e.target.value})
  }
  storeComplaint = async () => {
    console.log(this.state.complaintData);
    
    try {
      const { accounts, contract, complaintData } = this.state;
      console.log(complaintData);
      
      await contract.methods.writeComplaint(complaintData).send({ from: accounts[0] });
      console.log(await contract.methods.getComplaints(1).call());
    } catch (error) {
      alert('you are not authorised to write complaints')
      console.error(error);
      
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Navbar></Navbar>
        <p>Your address: {this.state.accounts[0]}</p>
        <input type="text" onChange={e => { this.storeComplaintData(e); }}/>
        <button onClick={this.storeComplaint}>store complaint</button>
      </div>
    );
  }
}

export default App;
