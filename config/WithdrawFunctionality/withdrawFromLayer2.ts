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


const approve = async (amount: string, spender: string) => {
  if (!particle.auth.isLogin()) {
    console.log("waiting for login");
    await particle.auth.login();
  }

  if (typeof window.ethereum !== "undefined") {
    try {
      const particleProvider = new ParticleProvider(particle.auth);
      const ethersProvider = new ethers.providers.Web3Provider(particleProvider, "any");
      const signer = ethersProvider.getSigner();
      const erc20Contract = new ethers.Contract(usdcContractAddress, erc20Abi, signer);
      const parsedAmount = ethers.utils.parseUnits(amount, 6);
      const tx = await erc20Contract.approve(spender, parsedAmount);
      console.log(`Transaction hash: ${tx.hash}`);
      await tx.wait();
      console.log("Transaction confirmed");
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  } else {
    console.log("No wallet");
  }
};

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