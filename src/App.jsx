import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NFTVerification = () => {
  const [hash, setHash] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {

  };

  return (
    <div style={styles.container}>
      <h2>NFT Hash Verification</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder="Enter NFT Hash"
          style={styles.input}
        />
        <button onClick={() => hash.trim() && navigate(`/verify/${hash}`)
        } style={styles.button}>
          Verify
        </button>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default NFTVerification;
