// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloToken33 {
    string public name = "HelloToken33";
    string public symbol = "HT33";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) private allowances;

    address public owner;
    bool public paused = false;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Paused();
    event Unpaused();
    event Mint(address indexed to, uint256 value);
    event Burn(address indexed from, uint256 value);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Token transfers are paused");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Balance retrieval
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    // Standard transfer function with pause check
    function transfer(address to, uint256 amount) public whenNotPaused returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    // Transfer function with allowance checking
    function transferFrom(address from, address to, uint256 amount) public whenNotPaused returns (bool) {
        require(allowances[from][msg.sender] >= amount, "Allowance exceeded");
        allowances[from][msg.sender] -= amount;
        _transfer(from, to, amount);
        return true;
    }

    // Approve allowance for spender
    function approve(address spender, uint256 amount) public returns (bool) {
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    // Increase allowance for spender
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        allowances[msg.sender][spender] += addedValue;
        emit Approval(msg.sender, spender, allowances[msg.sender][spender]);
        return true;
    }

    // Decrease allowance for spender
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        require(allowances[msg.sender][spender] >= subtractedValue, "Decreased allowance below zero");
        allowances[msg.sender][spender] -= subtractedValue;
        emit Approval(msg.sender, spender, allowances[msg.sender][spender]);
        return true;
    }

    // Allowance view function
    function allowance(address _owner, address spender) public view returns (uint256) {
        return allowances[_owner][spender];
    }

    // Only owner can mint new tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Burning own tokens
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    // Owner can burn tokens from a specific address, e.g., for inactive accounts
    function burnFrom(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }

    // Pausing functionality for owner only
    function pause() public onlyOwner {
        paused = true;
        emit Paused();
    }

    // Unpausing functionality for owner only
    function unpause() public onlyOwner {
        paused = false;
        emit Unpaused();
    }


    // Internal transfer function with zero address checks
    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "Transfer from zero address");
        require(to != address(0), "Transfer to zero address");
        require(balances[from] >= amount, "Insufficient balance");

        balances[from] -= amount;
        balances[to] += amount;
        emit Transfer(from, to, amount);
    }

    // Internal mint function with zero address check
    function _mint(address to, uint256 amount) internal {
        require(to != address(0), "Mint to zero address");

        totalSupply += amount;
        balances[to] += amount;
        emit Mint(to, amount);
    }

    // Internal burn function with zero address check
    function _burn(address from, uint256 amount) internal {
        require(from != address(0), "Burn from zero address");
        require(balances[from] >= amount, "Insufficient balance to burn");

        totalSupply -= amount;
        balances[from] -= amount;
        emit Burn(from, amount);
    }
}
