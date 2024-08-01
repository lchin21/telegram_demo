import assert from 'assert';
import { ethers } from 'ethers';
// @ts-ignore
import { WithdrawalFromL1Params, Types } from '../DepositFunctionality/types';
import abi from './Withdraw.abi.json';
import { getERC721MBlob } from '@/config/DepositFunctionality/asset';
import {ParticleProvider} from "@particle-network/provider";
import { particle } from "../config"
import {particleProvider, ethersProvider} from "../config";

export const withdrawalFromL1 = async (
  contractAddress: string,
  params: WithdrawalFromL1Params,
) => {
  const {
    ethAddress, type, assetType, tokenId, tokenUrl,
  } = params;
  switch (type) {
    case Types.ETH:
    case Types.ERC20:{
    console.log('correct cases')

      contractAddress = contractAddress
      const signer = ethersProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx =  contract.withdraw(ethAddress, "ERC20")
      await tx.wait()
      console.log(tx)
        return tx
    }

    // default: {
    //   assert(tokenId, 'tokenId is required');
    //   if (type === Types.ERC721MC) {
    //     assert(tokenUrl, 'tokenUrl is required');
    //   }
    //   const blob = type === Types.ERC721M ? ethers.utils.arrayify(ethers.utils.hexlify(Number(tokenId))) : getERC721MBlob(tokenUrl, tokenId.toString());
    //   const config = await prepareWriteContract({
    //     address: contractAddress as `0x${string}`,
    //     abi,
    //     functionName: 'withdrawAndMint',
    //     args: [ethAddress,
    //       assetType,
    //       blob],
    //   });
    //   return writeContract(config);
    // }
  }
};