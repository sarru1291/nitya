# Nitya - A decentralised criminal justice system

### How to setup? 
1. Open the Ganache (local blockchain) & create new workplace 
2. Integrate blockchain with MetaMask (localhost:7545)
3. Import account from Ganache
3. Build and deploy smart contract to ganache blockchain from root directory
    ```
    truffle compile --all
    truffle migrate --reset
    ```
4. Replace account[0] address present in `client/pages/home/home.js` file to the first address of Ganache blockchain
5. Start client
    cd client && npm start

If error is found while setting up project, try to degrade node-sass to 4.12, remove node module and package-lock.json file, and then run command as given in step 5. 