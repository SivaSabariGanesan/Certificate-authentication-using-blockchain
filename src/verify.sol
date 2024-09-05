// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VerifyTransaction {
    // Address to verify against
    address constant public expectedFromAddress = 0x8ce881174D5a0504b01FC92021E0b914f80f1334;

    // Event to emit result
    event VerificationResult(string message);

    // Function to verify if the 'from' address matches the expected address
    function verifyTransaction(address from) public returns (string memory) {
        if (from == expectedFromAddress) {
            emit VerificationResult("Verified");
            return "Verified";
        } else {
            emit VerificationResult("Not Verified");
            return "Not Verified";
        }
    }
}
