
export interface DepositERC20Params {
  starkKey: string;
  quantizedAmount: number | string;
  tokenAddress: string;
}

export interface VaultParams {
  assetId: string | string[];
  starkKeys: string | string[];
}

export interface VaultResponse {
  vault_ids: string[];
}


export interface Response<T> {
  data: T;
  status: string;
  error: string;
}

export enum Types {
  ETH = 'ETH',
  ERC20 = 'ERC20',
  // MINTABLE_ERC20 = 'MINTABLE_ERC20',
  ERC721 = 'ERC721',
  ERC721M = 'ERC721M',
  ERC721MC = 'ERC721MC',
}

export interface ContractInfoParams {
  type: string;
  contractAddress: string;
}
export interface ContractInfoResponse {
  quantum: number;
  count: number;
  type: string;
  decimals: string;
  symbol: string;
  total_supply: string;
  asset_type: string;
  asset_info: string;
  id: number;
  belongs_to: string;
  contract_uuid: string;
  chain_status: string;
  contract_address: string;
  metadata_url: string;
}

export interface Asset {
  type: `${Types}`;
  tokenAddress?: string;
  tokenId?: number | string;
  quantum?: number | string;
  tokenUrl?: string;
}

export interface DepositParams {
    starkKey: string;
    quantizedAmount: number | string;
}

export interface SignTransferParams {
  starkKey: string;
  privateKey: string;
  amount?: number | string;
  contractAddress?: string;
  tokenUrl?: string;
  tokenId?: string | number;
  type: `${Types}`;
  receiver: string;
  expirationTimestamp?: number;
}

export interface WithdrawalStatusParams {
  ethaddress: string;
  stage: 'withdrawarea';
}

export interface WithdrawalResponse {
  sequence_id: number;
}

export interface WithdrawalStatusResponse {
  asset_id: string;
  asset_type: string;
  token_id: string;
  amount: number;
  contract_address: string;
  symbol: string;
  type: `${Types}`;
  display_value: string;
}

export interface TransferRequestParams extends Partial<SignTransferParams> {
  nonce: number;
  vaultId: string;
  assetId: string;
  receiverVaultId: string;
  signature: SignatureLike;
}

export interface TransferResponse {
  sequence_id: number;
}

export type SignatureLike = {
  r: string;
  s: string;
};

export interface NonceResponse {
  nonce: number;
}


export type StarkKeyParams = Pick<RequestCommonParams, 'starkKey'>;

export interface RequestCommonParams {
  // ETH 可不传
  contractAddress?: string;
  starkKey: string;
}

export interface SignOrderParams {
  vaultIdSell: string;
  vaultIdBuy: string;
  amountSell: string;
  amountBuy: string;
  tokenSell: string;
  tokenBuy: string;
  nonce: number;
  expirationTimestamp: number;
  feeToken: string;
  feeVaultId: number;
  feeLimit: number;
  privateKey: string;
}

export interface CancelOrderRequestParams {
  starkKey: string;
  privateKey: string;
  orderId: number;
}

export interface Asset {
  type: `${Types}`;
  tokenAddress?: string;
  tokenId?: number | string;
  quantum?: number | string;
  tokenUrl?: string;
}