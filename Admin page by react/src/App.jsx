import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css'; // Import the CSS for styling

const contractAddress = "0x9a4937CEE4dD3a1ce061487C3A6CDD4081E6b8ea";
const contractABI = [
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "tokenURI",
              "type": "string"
          }
      ],
      "name": "mint",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "transfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "ownerOf",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "tokenURI",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
];


function App() {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const [tokenURI, setTokenURI] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [tokenIdTransfer, setTokenIdTransfer] = useState('');
    const [mintResult, setMintResult] = useState('');
    const [transferResult, setTransferResult] = useState('');

    useEffect(() => {
        async function initWeb3() {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setWeb3(web3Instance);
                    const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
                    setContract(contractInstance);
                    const accounts = await web3Instance.eth.getAccounts();
                    setAccount(accounts[0]);
                } catch (error) {
                    console.error("User denied account access", error);
                }
            } else {
                console.error("Non-Ethereum browser detected. Install MetaMask!");
            }
        }
        initWeb3();
    }, []);

    const mintNFT = async () => {
        if (contract && account) {
            try {
                const receipt = await contract.methods.mint(tokenURI).send({ from: account });
                setMintResult(`NFT minted with transaction hash: ${receipt.transactionHash}`);
            } catch (error) {
                console.error("Error minting NFT:", error);
                setMintResult("Error minting NFT.");
            }
        }
    };

    const transferNFT = async () => {
        if (contract && account) {
            try {
                const receipt = await contract.methods.transfer(toAddress, tokenIdTransfer).send({ from: account });
                setTransferResult(`NFT transferred with transaction hash: ${receipt.transactionHash}`);
            } catch (error) {
                console.error("Error transferring NFT:", error);
                setTransferResult("Error transferring NFT.");
            }
        }
    };

    return (
        <div className="container">
            <h1>VERIFICATION PAGE</h1>

            <h2>Mint a New NFT</h2>
            <input
                type="text"
                value={tokenURI}
                onChange={(e) => setTokenURI(e.target.value)}
                placeholder="Enter token URI (JSON metadata)"
            />
            <button onClick={mintNFT}>Mint NFT</button>
            <p>{mintResult}</p>

            <h2>Transfer an NFT</h2>
            <input
                type="text"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                placeholder="Recipient address"
            />
            <input
                type="number"
                value={tokenIdTransfer}
                onChange={(e) => setTokenIdTransfer(e.target.value)}
                placeholder="Token ID"
            />
            <button onClick={transferNFT}>Transfer NFT</button>
            <p>{transferResult}</p>
        </div>
    );
}

export default App;
