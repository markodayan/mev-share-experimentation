declare interface IRawBlock {
  baseFeePerGas?: string; // this property will not be here for legacy blocks (prior to London hardfork)
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: string;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactions: RawTransactions | string[];
  transactionsRoot: string;
  uncles: string[];
}

declare interface IRawFullBlock {
  baseFeePerGas?: string; // this property will not be here for legacy blocks (prior to London hardfork)
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: string;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactions: RawTransactions;
  transactionsRoot: string;
  uncles: string[];
}

declare interface IRawSlimBlock {
  baseFeePerGas?: string; // this property will not be here for legacy blocks (prior to London hardfork)
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: string;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactions: string[];
  transactionsRoot: string;
  uncles: string[];
}

declare type RawTransaction = RawLegacyTransaction | Raw2930Transaction | Raw1559Transaction;

declare type RawTransactions = (RawLegacyTransaction | Raw2930Transaction | Raw1559Transaction)[];

declare interface RawLegacyTransaction {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  r: string;
  s: string;
  v: string;
  to: string;
  transactionIndex: string;
  type: string;
  value: string;
}

declare interface Raw2930Transaction {
  accessList: string[]; // new field (EIP-2930)
  blockHash: string;
  blockNumber: string;
  chainId: string; // new field (EIP-2930)
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  r: string;
  s: string;
  v: string;
  to: string;
  transactionIndex: string;
  type: string;
  value: string;
}

declare interface Raw1559Transaction {
  accessList: string[];
  blockHash: string;
  blockNumber: string;
  chainId: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  maxFeePerGas: string; // new field (EIP-1559)
  maxPriorityFeePerGas: string; // new field (EIP-1559)
  nonce: string;
  r: string;
  s: string;
  to: string;
  transactionIndex: string;
  type: string;
  v: string;
  value: string;
}

declare interface IRawTransactionReceipt {
  blockHash: string;
  blockNumber: string;
  contractAddress: string | null;
  cumulativeGasUsed: string;
  effectiveGasPrice: string;
  from: string;
  gasUsed: string /* important */;
  logs: any[];
  logsBloom: string;
  status: string /* whether transaction successful or threw error */;
  to: string;
  transactionHash: string;
  transactionIndex: string;
  type: string;
}

/* Tuple to RLP encode (if before block 12965000)  */
declare type ILegacyBlockTuple = [
  parentHash: string,
  sha3Uncles: string,
  miner: string,
  stateRoot: string,
  transactionsRoot: string,
  receiptsRoot: string,
  logsBloom: string,
  difficulty: string,
  number: string,
  gasLimit: string,
  gasUsed: string,
  time: string,
  extraData: string,
  mixHash: string,
  nonce: string
];

/* Tuple to RLP encode (if after block 12965000)  */
declare type IPost1559Tuple = [
  parentHash: string,
  sha3Uncles: string,
  miner: string,
  stateRoot: string,
  transactionsRoot: string,
  receiptsRoot: string,
  logsBloom: string,
  difficulty: string,
  number: string,
  gasLimit: string,
  gasUsed: string,
  time: string,
  extraData: string,
  mixHash: string,
  nonce: string,
  baseFeePerGas: string
];

declare interface RawTransactionReceipt {
  blockHash: string;
  blockNumber: string;
  contractAddress: string | null;
  cumulativeGasUsed: string;
  effectiveGasPrice: string;
  from: string;
  gasUsed: string;
  logs: RawTransactionLogItem[];
  logsBloom: string;
  status: string;
  to: string;
  transactionHash: string;
  transactionIndex: string;
  type: string;
}

declare interface RawTransactionLogItem {
  address: string;
  blockHash: string;
  blockNumber: string;
  data: string;
  logIndex: string;
  removed: boolean;
  topics: string[];
  transactionHash: string;
  transactionIndex: string;
}
