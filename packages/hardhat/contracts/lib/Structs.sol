// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Structs {
    struct Event {
        uint8 typeOf;
        uint256 eventId;
        uint256 level;
        uint256 closingTimestamp;
        uint256 attendeeCount;
        string eventName;
        string eventDescription;
        string mentorName;
        string badgeUri;
        address mentorAddress;
        address[] attendees;
        bool isActive;
        bool overrideClosingTimestamp;
        bytes32 schemaUID;
    }

    struct AttestationProfile {
        uint256 studentLevel;
        uint256[] eventsCompleted;
        bytes32[] attestations;
    }

    struct metaEvent {
        bytes32 attestation;
        uint256 eventId;
        uint256 level;
        string eventName;
        string eventDescription;
        string mentorName;
        address mentorAddress;
    }
}
