// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MemberScore is ERC20, Ownable {
    uint totalSeasons = 0;
    uint currentNonce = 0;

    struct Proposal {
        string cid;
        uint season;
        uint score;
    }
    
    mapping(address => uint[]) seasonalScore; // user -> seasons[score]
    mapping(address => uint) totalScore;
    mapping(uint => address) nonceToUser;
    mapping(uint => bool) isClaimed;
    mapping(uint => Proposal) proposals;

    constructor() ERC20("FWB Reputation Token", "REP") {}

    function proposeNewScore(string memory cid, uint score) public {
        require(totalSeasons > 0, "No season started yet!");
        currentSeason = totalSeasons - 1;
        currentNonce += 1;
        Proposal newProposal = Proposal(cid, currentSeason, score);
        nonceToUser[_msgSender()] = currentNonce;
    }

    function startNewSeason() public onlyOwner {
        totalSeasons += 1;
    }

    function claim(uint nonce) public {
        require(!isClaimed[nonce], "REPs hhave been claimed already!");
        require(nonceToUser[nonce] == _msgSender(), "Only account owner can claim the REP!");
        _mint(_msgSender(), proposals[nonce].score);
        seasonalScore[_msgSender()][proposals[nonce].season] += proposals[nonce].score;
        totalScore[_msgSender()] += proposals[nonce].score;
    }

}
