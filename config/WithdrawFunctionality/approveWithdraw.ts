import assert from 'assert';
import { ethers } from 'ethers';
// @ts-ignore
import { WithdrawalFromL1Params, Types, Asset } from '../DepositFunctionality/types';
import abi from './Withdraw.abi.json';
import {getAssetTypeAndId, getERC721MBlob} from '@/config/DepositFunctionality/asset';
import {ParticleProvider} from "@particle-network/provider";
import { particle } from "../config"
import {particleProvider, ethersProvider} from "../config";
import axios from 'axios'

const request = axios.create({
    baseURL: 'https://api-dev.reddio.com'
})

const usdcContractAddress = '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8'

const assetDict: Asset = {
    type: Types.ERC20,
    tokenAddress: usdcContractAddress
}

export const withdrawalFromL1 = async (
  contractAddress: string,
  params: WithdrawalFromL1Params,
) => {
  const {
    ethAddress, type, tokenId, tokenUrl,
  } = params;
  const { assetType, assetId } = await getAssetTypeAndId(request, assetDict);


      const signer = ethersProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx =  contract.withdraw(ethAddress, assetType)
      console.log(tx)
        return tx
    }
