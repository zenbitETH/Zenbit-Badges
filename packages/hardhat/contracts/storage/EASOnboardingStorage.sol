// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../lib/Structs.sol";

contract EASOnboardingStorage {
    address deployer;

    mapping(address => Structs.AttestationProfile) public attestationProfile;
    mapping(uint256 => Structs.Event) public events;
    mapping(address => mapping(uint256 => bool)) public studentEventMap;
    mapping(address => bool) isMentor;
    uint256 public eventIdCounter = 1;

    function getAllEvents() public view returns (Structs.Event[] memory) {
        Structs.Event[] memory eventsArray = new Structs.Event[](eventIdCounter - 1);
        for (uint256 i = 1; i < eventIdCounter; i++) {
            eventsArray[i-1] = events[i];
        }
        return eventsArray;
    }
}
