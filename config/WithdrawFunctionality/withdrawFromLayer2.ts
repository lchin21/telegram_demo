import { AxiosInstance } from 'axios';
import {
  Response, SignTransferParams, WithdrawalStatusParams, WithdrawalStatusResponse,
  WithdrawalResponse,
} from '../DepositFunctionality/types';
import { parseParams } from '../parseParams';
import { getTransferParams } from './transfer';
import {ethers} from "ethers";
import abiJson from "@/config/DepositFunctionality/Deposit.abi.json";
import {particle} from "@/config/config";
import {ParticleProvider} from "@particle-network/provider";

const abi: ethers.ContractInterface = abiJson as ethers.ContractInterface;



const usdcContractAddress = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8";
const erc20Abi = [
  "function approve(address spender, uint256 amount) public returns (bool)"
];


export const withdrawalFromL2 = async (
  request: AxiosInstance,
  data: SignTransferParams,
) => {
  const params = await getTransferParams(request, data);
  return request.post<Response<WithdrawalResponse>>('/v1/withdrawalto', {
    ...parseParams(params),
  });
};

export const withdrawalStatus = async (
  request: AxiosInstance,
  params: WithdrawalStatusParams,
) => request.get<Response<WithdrawalStatusResponse[]>>('/v1/withdrawal/status', {
  params: {
    ...parseParams(params),
  },
});

