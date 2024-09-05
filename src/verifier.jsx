import React, { useState } from 'react';
import Web3 from 'web3';


export default function SepoliaEtherscanVerifier() {
    const [hash, setHash] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [verificationResult, setVerificationResult] = useState(null);
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');

    // Solidity contract ABI and address
    const contractABI = [
        {
            "inputs": [],
            "name": "targetHash",
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
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                }
            ],
            "name": "verify",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const contractAddress = '0xDA0bab807633f07f013f94DD0E6A4F96F8742B53'; // Replace with your contract address

    const web3 = new Web3(Web3.givenProvider || "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID");

    const fetchTransactionData = async () => {
        setLoading(true);
        setError(null);

        const apiKey = 'XVA3NWVCQFSC2KMBXJ1B1FSJ81EFWPU2PW'; // Replace with your Sepolia Etherscan API key
        const url = `https://api-sepolia.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=${apiKey}`;

        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result.result) {
                setData(result.result); // The transaction data is in the 'result' field
                setFromAddress(result.result.from); // Automatically populate from address
                setToAddress(result.result.to); // Automatically populate to address
            } else {
                setError('Transaction not found or invalid hash');
            }
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    // Handle Verify button click
    const handleVerifyClick = async () => {
        if (hash) {
            fetchTransactionData();
        } else {
            setError('Please enter a hash value.');
        }
    };

    // Function to interact with the smart contract using Web3.js
    const handleValidationClick = async () => {
        if (fromAddress && toAddress) {
            try {
                // Create contract instance
                const contract = new web3.eth.Contract(contractABI, contractAddress);

                // Call the verify function from your smart contract
                const isVerified = await contract.methods.verify(fromAddress).call();

                // Check if the address matches the predefined address
                setVerificationResult(isVerified ? 'Certificate is valid' : 'Certificate is invalid');
            } catch (err) {
                console.error("Error verifying transaction:", err);
                setVerificationResult('Error verifying the certificate');
            }
        } else {
            setVerificationResult('Please enter the From and To addresses.');
        }
    };

    return (
        <div style={styles.container}>
          
            <h2>Verify Transaction</h2>
            <input
                type="text"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                placeholder="Enter Transaction Hash"
                style={styles.input}
            />
            <button onClick={handleVerifyClick} style={styles.button}>
                Fetch Transaction
            </button>

            {loading && <p>Loading...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {data && (
                <div style={styles.dataContainer}>
                    <h3>Transaction Details</h3>
                    <p><strong>Block Hash:</strong> {data.blockHash}</p>
                    <p><strong>From:</strong> {data.from}</p>
                    <p><strong>To:</strong> {data.to}</p>
                    <p><strong>Gas:</strong> {data.gas}</p>
                    <p><strong>Value:</strong> {data.value}</p>
                    <p><strong>Nonce:</strong> {data.nonce}</p>
                    {/* Display other transaction data as needed */}
                    
                    <div style={styles.inputContainer}>
                        <input
                            type="text"
                            value={fromAddress}
                            className='input_box'
                            onChange={(e) => setFromAddress(e.target.value)}
                            placeholder="Enter From Address"
                            style={styles.input}

                        />
                       
                    </div>
                    
                    <button 
                onClick={handleVerifyClick} 
                style={styles.button}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
            >
                Verify Certification
            </button>
                </div>
            )}
            {verificationResult && <p style={styles.result}>{verificationResult}</p>}
        </div>
    );
}

// Inline styles
const styles = {
  
  container: {
      textAlign: 'center',
      margin: '20px auto',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 0 15px rgba(0,0,0,0.2)',
      background: 'linear-gradient(135deg, #C04848, #c3cfe2)',
      maxWidth: '800px',
  },
  input: {
      padding: '12px',
      margin: '10px 0',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '16px',
      width: '100%',
      boxSizing: 'border-box',
  },
  button: {
      padding: '12px 25px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      marginTop: '15px',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  buttonHover: {
      backgroundColor: '#0056b3',
      transform: 'scale(1.05)',
  },
  dataContainer: {
      textAlign: 'left',
      display: 'inline-block',
      maxWidth: '100%',
      marginTop: '20px',
      padding: '15px',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  inputContainer: {
      marginTop: '20px',
  },
  input_box: {
      padding: '12px',
      margin: '5px 0',
  },
  error: {
      color: '#d9534f',
      fontSize: '16px',
      marginTop: '10px',
  },
  result: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginTop: '20px',
      color: '#28a745',
  },
};
