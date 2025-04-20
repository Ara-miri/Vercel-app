export const contractAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "click",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAllUsers",
    inputs: [],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOwner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSortedUsers",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct TeaLoveContract.UserStats[]",
        components: [
          { name: "user", type: "address", internalType: "address" },
          { name: "clicks", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasClicked",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalClicks",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "userClicks",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "users",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "Clicked",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "totalClicks",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "userClicks",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
];

export const teaSepoliaChain = {
  chainId: "0x27EA", // 10218 in hex
  chainName: "Tea Sepolia Testnet",
  nativeCurrency: {
    name: "TEA",
    symbol: "TEA",
    decimals: 18,
  },
  rpcUrls: ["https://tea-sepolia.g.alchemy.com/public"],
  blockExplorerUrls: ["https://sepolia.tea.xyz"],
};

export const mainContractAddress = "0x4DD4bF108C5eeafF6c4972752593bB28277E6c4D"; // tea sepolia
