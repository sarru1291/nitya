import React from "react";
import NityaContract from "../contracts/Nitya.json";
import getWeb3 from "../getWeb3";
export const User = React.createContext({
  web3: null,
  accounts: null,
  contract: null
  // addProductToCart: () => { },
  // removeProductFromCart: () => { }
});

export class UserProvider extends React.Component {
  state = {
    web3: null,
    accounts: null,
    contract: null

    // addProductToCart: this.addProductToCart,
    // removeProductFromCart: this.removeProductFromCart
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
  // addProductToCart = p => {
  //     this.setState({
  //         products: [...this.state.products, p]
  //     });
  //     console.log(this.products);

  // };
  // removeProductFromCart = p => {
  //     alert('You want to remove the product');
  //     // let newProducts = this.products.filter(p => p.title != p);
  //     // this.products = newProducts;
  // };

  render() {
    return (
      <User.Provider value={this.state}>{this.props.children}</User.Provider>
    );
  }
}

