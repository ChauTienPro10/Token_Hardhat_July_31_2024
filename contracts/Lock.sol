// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Token {
    uint public unlockTime;
    mapping(address  => uint256) private _balances;
    mapping(address  => mapping(address  => uint256)) private _allowances;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;
    address private _owner;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Deposit(address indexed owner,uint256 value);
    // ham khoi tao 
    constructor(uint256 _unlockTime ,string memory name_, string memory symbol_) public payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );
        _name = name_;
        _symbol = symbol_;
        _owner = msg.sender;
        unlockTime = _unlockTime;
        
    }

    //tra ve ten cua token
    function name() public view  returns (string memory) {
        return _name;
    }
    //tra ve ky hieu cua token
    function symbol() public view  returns (string memory) {
        return _symbol;
    }

    // xem owner
    function owner() public view returns (address){
        return _owner;
    } 
    function decimals() public pure  returns (uint8) {
        return 18;
    }
// tong so token dang co trong he thong
    function totalSupply() public view  returns (uint256) {
        return _totalSupply;
    }
    // so token cua dia chi
    function balanceOf(address account) public view  returns (uint256) {
        return _balances[account];
    }
    function approve(address spender, uint256 value) public  returns (bool) {
        address ownerAdd = _msgSender();
        _approve(ownerAdd, spender, value);
        return true;
    }

    function deposit(uint256 value) public  returns (bool){
        require(msg.sender ==_owner,"you can not deposit ");
        require(value>0,"you can't deposit value 0");
        _balances[msg.sender]+=value;
        _totalSupply+=value;
        emit Deposit(msg.sender, value);
    }

    function allowance(address ownerAdd, address spender) public view  returns (uint256) {
        return _allowances[ownerAdd][spender];
    }
    
    function transfer(address to, uint256 value) public  returns (bool) {
        address ownerAdd = _msgSender();
        _transfer(ownerAdd, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public  returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }

    
    function _transfer(address from, address to, uint256 value) internal {
        uint256 fromBalance = _balances[from];
        require(fromBalance >= value, "ERC20: transfer amount exceeds balance");
        require(value>0,"You can not transfer 0 or lesser");

        _balances[from] -= value;
        _balances[to] += value;

        emit Transfer(from, to, value);
    }
    function _msgSender() internal view  returns (address payable) {
        return msg.sender;
    }
    function _update(address from, address to, uint256 value) internal {
        require(from != address(0), "MyToken: cannot update from the zero address");
        require(to != address(0), "MyToken: cannot update to the zero address");
        require(_balances[from] >= value, "MyToken: update amount exceeds balance");

        _balances[from] -= value;
        _balances[to] += value;

        emit Transfer(from, to, value);
    }

    function _mint(address account, uint256 value) internal  {
        require(account != address(0), "ERC20: cannot mint to the zero address");

        _totalSupply += value;
        _balances[account] += value;
        emit Transfer(address(0), account, value);
    }
    
   function _burn(address account, uint256 value) internal  {
        require(account != address(0), "ERC20: cannot burn from the zero address");
        require(account != _owner, "ERC20: cannot be owner");

        _update(account, _owner, value);
    }

    function _approve(address ownerAdd, address spender, uint256 value) internal {
        _approve(ownerAdd, spender, value, true);
    }

    function _approve(address ownerAdd, address spender, uint256 value, bool emitEvent) internal  {
        require(ownerAdd != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[ownerAdd][spender] = value;
        if (emitEvent) {
            emit Approval(ownerAdd, spender, value);
        }
    }

    function _spendAllowance(address ownerAdd, address spender, uint256 value) internal  {
    uint256 currentAllowance = _allowances[ownerAdd][spender];
    if (currentAllowance != ~uint256(0)) {
        if (currentAllowance >= value) {
            _approve(ownerAdd, spender, currentAllowance - value, true);
        } else {
            revert("ERC20: insufficient allowance");
        }
    }
}

}

