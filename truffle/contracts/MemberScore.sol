// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MemberScore is ERC20, Ownable {
    uint public totalSeasons = 0;
    uint public currentNonce = 0;

    struct Proposal {
        string cid;
        uint season;
        uint score;
    }

    event LogNewScore(string cid, uint nonce, uint season, uint score);
    event LogNewSeason(uint season);
    event LogClaimed(uint nonce);
    
    mapping (address => uint[]) public seasonalScore; // user -> seasons[score]
    mapping (address => uint) public totalScore;
    mapping (uint => address) public nonceToUser;
    mapping (uint => bool) public isClaimed;
    mapping (uint => Proposal) public proposals;

    constructor() ERC20("FWB Reputation Token", "REP") {}

    function proposeNewScore(string memory cid, uint score) public {
        require(totalSeasons > 0, "No season started yet!");
        uint currentSeason = totalSeasons - 1;
        currentNonce += 1;
        Proposal memory newProposal = Proposal(cid, currentSeason, score);
        nonceToUser[currentNonce] = _msgSender();
        proposals[currentNonce] = newProposal;
        emit LogNewScore(cid, currentNonce, currentSeason, score);
    }

    function startNewSeason() public onlyOwner {
        emit LogNewSeason(totalSeasons);
        totalSeasons += 1;
    }

    function claim(uint nonce) public {
        require(totalSeasons > proposals[nonce].season + 1, "REP can only be claimed once season ends!");
        require(!isClaimed[nonce], "REPs have been claimed already!");
        require(nonceToUser[nonce] == _msgSender(), "Only account owner can claim the REP!");
        _mint(_msgSender(), proposals[nonce].score);
        seasonalScore[_msgSender()][proposals[nonce].season] += proposals[nonce].score;
        totalScore[_msgSender()] += proposals[nonce].score;
        emit LogClaimed(nonce);
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        require(false, "Transfer not supported for the REP token!");
        return super.transfer(recipient, amount);
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        require(false, "Transfer not supported for the REP token!");
        return super.transferFrom(sender, recipient, amount);
    }
}
