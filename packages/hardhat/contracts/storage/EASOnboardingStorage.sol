// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../lib/Structs.sol";
import "hardhat/console.sol";

contract EASOnboardingStorage {
    address deployer;

    mapping(address => Structs.AttestationProfile) public attestationProfile;
    mapping(address => mapping(uint256 => Structs.metaEvent)) public studentEventMap;
    mapping(uint256 => Structs.Event) public events;
    mapping(address => bool) isMentor;
    uint256 public eventIdCounter = 1;

    function getAllEvents() public view returns (Structs.Event[] memory) {
        Structs.Event[] memory eventsArray = new Structs.Event[](eventIdCounter - 1);
        for (uint256 i = 1; i < eventIdCounter; i++) {
            eventsArray[i - 1] = events[i];
        }
        return eventsArray;
    }
    // Function to get eventsCompleted

    function getAllStudentEventsWithAttestations(address _studentAddress)
        public
        view
        returns (Structs.metaEvent[] memory)
    {
        string[] memory uris = new string[](attestationProfile[_studentAddress].eventsCompleted.length);
        Structs.metaEvent[] memory metaArray =
            new Structs.metaEvent[](attestationProfile[_studentAddress].eventsCompleted.length);
        for (uint256 i = 0; i < attestationProfile[_studentAddress].eventsCompleted.length; i++) {
            metaArray[i] = studentEventMap[_studentAddress][attestationProfile[_studentAddress].eventsCompleted[i]];
            uris[i] = events[attestationProfile[_studentAddress].eventsCompleted[i]].badgeUri; 
        }
        return metaArray;
    }

    function getEventsCompleted(address _studentAddress)
        public
        view
        returns (uint256 _studentLevel, uint256[] memory, bytes32[] memory)
    {
        return (
            attestationProfile[_studentAddress].studentLevel,
            attestationProfile[_studentAddress].eventsCompleted,
            attestationProfile[_studentAddress].attestations
        );
    }
}
