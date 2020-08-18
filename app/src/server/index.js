const express = require('express');
const os = require('os');
const Web3 = require('web3');
const SimpleStorageContract = require('../contracts/SimpleStorage.json');

const app = express();
// To connect to RSK network update line 11 for one of the following providers:
// const provider = new Web3.providers.HttpProvider("https://public-node.testnet.rsk.co");
// const provider = new Web3.providers.HttpProvider("https://public-node.rsk.co");

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
const web3 = new Web3(provider);

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/getValueStore', async(req, res) => {
    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SimpleStorageContract.networks[networkId];
    const contractInstance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
    );

    res.send({ value: await contractInstance.methods.get().call()});

});

app.listen(process.env.PORT || 8080, () => console.log(`Go to your browser at http://127.0.0.1:${process.env.PORT || 8080}!`));
