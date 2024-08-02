import { BigNumber, ethers } from 'ethers';
import { prepareWriteContract, writeContract, readContract } from '@wagmi/core';
import type { WriteContractResult } from '@wagmi/core';
// import { AllowanceErc20Params, ApproveErc20Params } from '../types';
import abi from './Deposit.abi.json';


export interface ErcCommonParams {
  tokenAddress: string;
}

export interface ApproveErc20Params extends ErcCommonParams {
  amount: string | number | 'max';
}

export interface AllowanceErc20Params extends ErcCommonParams {
  ethAddress: string;
}

  export const erc20Approve = async (
    contractAddress: string,
    params: ApproveErc20Params,
  ): Promise<WriteContractResult> => {

    const { tokenAddress, amount } = params;
    let decimals: BigNumber = BigNumber.from(18);

    try {
      decimals = await readContract({
        address: tokenAddress as `0x${string}`,
        abi,
        functionName: 'decimals',
      }) as BigNumber;
    } catch (e) {
      console.log(e);
    }

    const value = amount === 'max' ? '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' : ethers.utils.parseUnits(amount.toString(), decimals);
    const config = await prepareWriteContract({
      address: tokenAddress as `0x${string}`,
      abi,
      functionName: 'approve',
      args: [contractAddress, value],
    });
    return writeContract(config);
  };

export const erc20Allowance = async (
  contractAddress: string,
  params: AllowanceErc20Params,
): Promise<any> => {
  const { tokenAddress, ethAddress } = params;
  return readContract({
    address: tokenAddress as `0x${string}`,
    abi,
    functionName: 'allowance',
    args: [ethAddress, contractAddress]
  })
};