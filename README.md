# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Token.js
```

# HelloToken33

HelloToken33 is an ERC20-compatible token smart contract on the Ethereum blockchain. It includes standard features like transfers, allowances, minting, and burning, along with owner-only control over pausing/unpausing transfers.

## Contract Details

- **Name**: HelloToken33
- **Symbol**: HT33
- **Decimals**: 18
- **Total Supply**: Dynamic, depending on minting and burning.

## Features

### 1. Token Metadata

- **name**: `HelloToken33`
- **symbol**: `HT33`
- **decimals**: 18 (ERC20 standard)

### 2. Owner Management

- **Owner**: The deployer of the contract is assigned as the `owner` with exclusive access to specific functions.
- **Owner-only functions**: Only the owner can pause/unpause transfers and mint or burn tokens on behalf of other addresses.

### 3. Pause/Unpause Mechanism

- **pause**: Allows the owner to stop all token transfers.
- **unpause**: Allows the owner to resume token transfers.
- **paused**: Public variable indicating the current pause state.
- **Events**:
  - `Paused`: Emitted when the contract is paused.
  - `Unpaused`: Emitted when the contract is unpaused.

### 4. Balance and Allowance Management

- **balanceOf**: Retrieves the token balance of a specific address.
- **allowance**: Checks the approved amount a spender can withdraw from the owner's balance.
- **approve**: Sets an allowance for a spender to spend tokens on behalf of the caller.
- **increaseAllowance** and **decreaseAllowance**: Modifies a spender’s allowance.
- **Events**:
  - `Approval`: Emitted when an allowance is set or updated.

### 5. Token Transfer

- **transfer**: Transfers tokens to a specified address. The transfer will fail if the contract is paused.
- **transferFrom**: Allows an approved spender to transfer tokens on behalf of another address.
- **Events**:
  - `Transfer`: Emitted on successful token transfers.

### 6. Minting

- **mint**: Allows the owner to create new tokens and add them to a specified address, increasing the total supply.
- **Events**:
  - `Mint`: Emitted when tokens are successfully minted.

### 7. Burning

- **burn**: Allows a token holder to burn their own tokens, reducing the total supply.
- **burnFrom**: Allows the owner to burn tokens from a specific address.
- **Events**:
  - `Burn`: Emitted when tokens are successfully burned.

### 8. Internal Safeguards

- Prevents zero-address transfers, minting, and burning.
- Ensures sufficient balance and allowance for transfers and burns.

## Modifiers

- **onlyOwner**: Restricts function access to the contract owner.
- **whenNotPaused**: Restricts function access when the contract is not paused.

## Events Summary

- **Transfer**: Emitted when tokens are transferred.
- **Approval**: Emitted when an allowance is set or updated.
- **Paused**: Emitted when the contract is paused.
- **Unpaused**: Emitted when the contract is unpaused.
- **Mint**: Emitted when tokens are minted.
- **Burn**: Emitted when tokens are burned.
