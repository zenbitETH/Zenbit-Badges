export const abi = {
  address: "0x4200000000000000000000000000000000000021",
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "AccessDenied",
      type: "error",
    },
    {
      inputs: [],
      name: "AlreadyRevoked",
      type: "error",
    },
    {
      inputs: [],
      name: "AlreadyRevokedOffchain",
      type: "error",
    },
    {
      inputs: [],
      name: "AlreadyTimestamped",
      type: "error",
    },
    {
      inputs: [],
      name: "InsufficientValue",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidAttestation",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidAttestations",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidExpirationTime",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidLength",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidOffset",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidRegistry",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidRevocation",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidRevocations",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidSchema",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidSignature",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidVerifier",
      type: "error",
    },
    {
      inputs: [],
      name: "Irrevocable",
      type: "error",
    },
    {
      inputs: [],
      name: "NotFound",
      type: "error",
    },
    {
      inputs: [],
      name: "NotPayable",
      type: "error",
    },
    {
      inputs: [],
      name: "WrongSchema",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "attester",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "uid",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "schema",
          type: "bytes32",
        },
      ],
      name: "Attested",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "attester",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "uid",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "schema",
          type: "bytes32",
        },
      ],
      name: "Revoked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "revoker",
          type: "address",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "data",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "uint64",
          name: "timestamp",
          type: "uint64",
        },
      ],
      name: "RevokedOffchain",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "data",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "uint64",
          name: "timestamp",
          type: "uint64",
        },
      ],
      name: "Timestamped",
      type: "event",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "schema",
              type: "bytes32",
            },
            {
              components: [
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              internalType: "struct AttestationRequestData",
              name: "data",
              type: "tuple",
            },
          ],
          internalType: "struct AttestationRequest",
          name: "request",
          type: "tuple",
        },
      ],
      name: "attest",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "schema",
              type: "bytes32",
            },
            {
              components: [
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              internalType: "struct AttestationRequestData",
              name: "data",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              internalType: "struct EIP712Signature",
              name: "signature",
              type: "tuple",
            },
            {
              internalType: "address",
              name: "attester",
              type: "address",
            },
          ],
          internalType: "struct DelegatedAttestationRequest",
          name: "delegatedRequest",
          type: "tuple",
        },
      ],
      name: "attestByDelegation",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAttestTypeHash",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "uid",
          type: "bytes32",
        },
      ],
      name: "getAttestation",
      outputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "uid",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "schema",
              type: "bytes32",
            },
            {
              internalType: "uint64",
              name: "time",
              type: "uint64",
            },
            {
              internalType: "uint64",
              name: "expirationTime",
              type: "uint64",
            },
            {
              internalType: "uint64",
              name: "revocationTime",
              type: "uint64",
            },
            {
              internalType: "bytes32",
              name: "refUID",
              type: "bytes32",
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              internalType: "address",
              name: "attester",
              type: "address",
            },
            {
              internalType: "bool",
              name: "revocable",
              type: "bool",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          internalType: "struct Attestation",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getDomainSeparator",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getName",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "getNonce",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "revoker",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "data",
          type: "bytes32",
        },
      ],
      name: "getRevokeOffchain",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getRevokeTypeHash",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "getSchemaRegistry",
      outputs: [
        {
          internalType: "contract ISchemaRegistry",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "data",
          type: "bytes32",
        },
      ],
      name: "getTimestamp",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "uid",
          type: "bytes32",
        },
      ],
      name: "isAttestationValid",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "schema",
              type: "bytes32",
            },
            {
              components: [
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              internalType: "struct AttestationRequestData[]",
              name: "data",
              type: "tuple[]",
            },
          ],
          internalType: "struct MultiAttestationRequest[]",
          name: "multiRequests",
          type: "tuple[]",
        },
      ],
      name: "multiAttest",
      outputs: [
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "schema",
              type: "bytes32",
            },
            {
              components: [
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              internalType: "struct AttestationRequestData[]",
              name: "data",
              type: "tuple[]",
            },
            {
              components: [
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              internalType: "struct EIP712Signature[]",
              name: "signatures",
              type: "tuple[]",
            },
            {
              internalType: "address",
              name: "attester",
              type: "address",
            },
          ],
          internalType: "struct MultiDelegatedAttestationRequest[]",
          name: "multiDelegatedRequests",
          type: "tuple[]",
        },
      ],
      name: "multiAttestByDelegation",
      outputs: [
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "schema",
              type: "bytes32",
            },
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              internalType: "struct RevocationRequestData[]",
              name: "data",
              type: "tuple[]",
            },
          ],
          internalType: "struct MultiRevocationRequest[]",
          name: "multiRequests",
          type: "tuple[]",
        },
      ],
      name: "multiRevoke",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "schema",
              type: "bytes32",
            },
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              internalType: "struct RevocationRequestData[]",
              name: "data",
              type: "tuple[]",
            },
            {
              components: [
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              internalType: "struct EIP712Signature[]",
              name: "signatures",
              type: "tuple[]",
            },
            {
              internalType: "address",
              name: "revoker",
              type: "address",
            },
          ],
          internalType: "struct MultiDelegatedRevocationRequest[]",
          name: "multiDelegatedRequests",
          type: "tuple[]",
        },
      ],
      name: "multiRevokeByDelegation",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32[]",
          name: "data",
          type: "bytes32[]",
        },
      ],
      name: "multiRevokeOffchain",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32[]",
          name: "data",
          type: "bytes32[]",
        },
      ],
      name: "multiTimestamp",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "schema",
              type: "bytes32",
            },
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              internalType: "struct RevocationRequestData",
              name: "data",
              type: "tuple",
            },
          ],
          internalType: "struct RevocationRequest",
          name: "request",
          type: "tuple",
        },
      ],
      name: "revoke",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "schema",
              type: "bytes32",
            },
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              internalType: "struct RevocationRequestData",
              name: "data",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              internalType: "struct EIP712Signature",
              name: "signature",
              type: "tuple",
            },
            {
              internalType: "address",
              name: "revoker",
              type: "address",
            },
          ],
          internalType: "struct DelegatedRevocationRequest",
          name: "delegatedRequest",
          type: "tuple",
        },
      ],
      name: "revokeByDelegation",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "data",
          type: "bytes32",
        },
      ],
      name: "revokeOffchain",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "data",
          type: "bytes32",
        },
      ],
      name: "timestamp",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};

export const deployedContract = {
  address: "0x6B3cC5aeedB91F2B72e42d75c45E8daf93Dcc7d3",
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_attestation",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "_studentAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_eventId",
          type: "uint256",
        },
      ],
      name: "addAttestation",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_newMentors",
          type: "address[]",
        },
      ],
      name: "addMentors",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "attestationProfile",
      outputs: [
        {
          internalType: "uint256",
          name: "studentLevel",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_closingTimestamp",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_level",
          type: "uint256",
        },
        {
          internalType: "uint8",
          name: "_type",
          type: "uint8",
        },
        {
          internalType: "string",
          name: "_eventName",
          type: "string",
        },
        {
          internalType: "string",
          name: "_eventDescription",
          type: "string",
        },
        {
          internalType: "string",
          name: "_mentorName",
          type: "string",
        },
      ],
      name: "createEvent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "eventIdCounter",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "events",
      outputs: [
        {
          internalType: "uint8",
          name: "typeOf",
          type: "uint8",
        },
        {
          internalType: "uint256",
          name: "eventId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "level",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "closingTimestamp",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "attendeeCount",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "eventName",
          type: "string",
        },
        {
          internalType: "string",
          name: "eventDescription",
          type: "string",
        },
        {
          internalType: "string",
          name: "mentorName",
          type: "string",
        },
        {
          internalType: "address",
          name: "mentorAddress",
          type: "address",
        },
        {
          internalType: "bool",
          name: "isActive",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "overrideClosingTimestamp",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllEvents",
      outputs: [
        {
          components: [
            {
              internalType: "uint8",
              name: "typeOf",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "level",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "closingTimestamp",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "attendeeCount",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "eventName",
              type: "string",
            },
            {
              internalType: "string",
              name: "eventDescription",
              type: "string",
            },
            {
              internalType: "string",
              name: "mentorName",
              type: "string",
            },
            {
              internalType: "address",
              name: "mentorAddress",
              type: "address",
            },
            {
              internalType: "address[]",
              name: "attendees",
              type: "address[]",
            },
            {
              internalType: "bool",
              name: "isActive",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "overrideClosingTimestamp",
              type: "bool",
            },
          ],
          internalType: "struct Structs.Event[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_studentAddress",
          type: "address",
        },
      ],
      name: "getAllStudentEventsWithAttestations",
      outputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "attestation",
              type: "bytes32",
            },
            {
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "level",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "eventName",
              type: "string",
            },
            {
              internalType: "string",
              name: "eventDescription",
              type: "string",
            },
            {
              internalType: "string",
              name: "mentorName",
              type: "string",
            },
            {
              internalType: "address",
              name: "mentorAddress",
              type: "address",
            },
          ],
          internalType: "struct Structs.metaEvent[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_eventId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_level",
          type: "uint256",
        },
        {
          internalType: "bytes32",
          name: "_msgHash",
          type: "bytes32",
        },
        {
          internalType: "bytes",
          name: "_signature",
          type: "bytes",
        },
      ],
      name: "getAttested",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_messageHash",
          type: "bytes32",
        },
      ],
      name: "getEthSignedMessageHash",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_studentAddress",
          type: "address",
        },
      ],
      name: "getEventsCompleted",
      outputs: [
        {
          internalType: "uint256",
          name: "_studentLevel",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_messageHash",
          type: "bytes32",
        },
        {
          internalType: "bytes",
          name: "_signature",
          type: "bytes",
        },
      ],
      name: "isVerified",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_ethSignedMessageHash",
          type: "bytes32",
        },
        {
          internalType: "bytes",
          name: "_signature",
          type: "bytes",
        },
      ],
      name: "recoverSigner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "sig",
          type: "bytes",
        },
      ],
      name: "splitSignature",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "studentEventMap",
      outputs: [
        {
          internalType: "bytes32",
          name: "attestation",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "eventId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "level",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "eventName",
          type: "string",
        },
        {
          internalType: "string",
          name: "eventDescription",
          type: "string",
        },
        {
          internalType: "string",
          name: "mentorName",
          type: "string",
        },
        {
          internalType: "address",
          name: "mentorAddress",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_eventId",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "_res",
          type: "bool",
        },
      ],
      name: "toggleOverrideEventFlag",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
export const gnosisContract = {
  abi: [
    {
      constant: true,
      inputs: [
        {
          name: "owner",
          type: "address",
        },
      ],
      name: "isOwner",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
        {
          name: "data",
          type: "bytes",
        },
        {
          name: "operation",
          type: "uint8",
        },
      ],
      name: "execTransactionFromModule",
      outputs: [
        {
          name: "success",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "module",
          type: "address",
        },
      ],
      name: "enableModule",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_masterCopy",
          type: "address",
        },
      ],
      name: "changeMasterCopy",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "SENTINEL_MODULES",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "prevOwner",
          type: "address",
        },
        {
          name: "owner",
          type: "address",
        },
        {
          name: "_threshold",
          type: "uint8",
        },
      ],
      name: "removeOwner",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "SENTINEL_OWNERS",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_owners",
          type: "address[]",
        },
        {
          name: "_threshold",
          type: "uint8",
        },
        {
          name: "to",
          type: "address",
        },
        {
          name: "data",
          type: "bytes",
        },
      ],
      name: "setup",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getOwners",
      outputs: [
        {
          name: "",
          type: "address[]",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "NAME",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "nonce",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getModules",
      outputs: [
        {
          name: "",
          type: "address[]",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_threshold",
          type: "uint8",
        },
      ],
      name: "changeThreshold",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "owner",
          type: "address",
        },
        {
          name: "_threshold",
          type: "uint8",
        },
      ],
      name: "addOwnerWithThreshold",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "prevModule",
          type: "address",
        },
        {
          name: "module",
          type: "address",
        },
      ],
      name: "disableModule",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "prevOwner",
          type: "address",
        },
        {
          name: "oldOwner",
          type: "address",
        },
        {
          name: "newOwner",
          type: "address",
        },
      ],
      name: "swapOwner",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getThreshold",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "VERSION",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      payable: true,
      stateMutability: "payable",
      type: "fallback",
    },
    {
      anonymous: false,
      inputs: [],
      name: "ExecutionFailed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "newContract",
          type: "address",
        },
      ],
      name: "ContractCreation",
      type: "event",
    },
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
        {
          name: "data",
          type: "bytes",
        },
        {
          name: "operation",
          type: "uint8",
        },
        {
          name: "safeTxGas",
          type: "uint256",
        },
        {
          name: "dataGas",
          type: "uint256",
        },
        {
          name: "gasPrice",
          type: "uint256",
        },
        {
          name: "gasToken",
          type: "address",
        },
        {
          name: "v",
          type: "uint8[]",
        },
        {
          name: "r",
          type: "bytes32[]",
        },
        {
          name: "s",
          type: "bytes32[]",
        },
      ],
      name: "execAndPayTransaction",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "executionGas",
          type: "uint256",
        },
        {
          name: "dataGas",
          type: "uint256",
        },
      ],
      name: "totalGasCosts",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
        {
          name: "data",
          type: "bytes",
        },
        {
          name: "operation",
          type: "uint8",
        },
      ],
      name: "requiredTxGas",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
        {
          name: "data",
          type: "bytes",
        },
        {
          name: "operation",
          type: "uint8",
        },
        {
          name: "safeTxGas",
          type: "uint256",
        },
        {
          name: "dataGas",
          type: "uint256",
        },
        {
          name: "gasPrice",
          type: "uint256",
        },
        {
          name: "gasToken",
          type: "address",
        },
        {
          name: "_nonce",
          type: "uint256",
        },
      ],
      name: "getTransactionHash",
      outputs: [
        {
          name: "",
          type: "bytes32",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ],
};
