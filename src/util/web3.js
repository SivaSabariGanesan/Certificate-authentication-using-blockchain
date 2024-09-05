// src/web3.js
import Web3 from "web3";

const getWeb3 = async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable(); // Request account access
            return web3;
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        return new Web3(window.web3.currentProvider);
    } else {
        console.error("Non-Ethereum browser detected. Install MetaMask!");
    }
};

export default getWeb3;
