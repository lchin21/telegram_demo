import {ethers, BigNumber} from "ethers";
import {ParticleProvider} from "@particle-network/provider";
// Optional
import axios, {AxiosInstance} from 'axios';
// @ts-ignore
import abiJson from ' ';
import {Types, Asset, Response, ContractInfoParams, ContractInfoResponse, VaultParams, VaultResponse, DepositParams, } from './types'
//import reddio, particle from config
import {reddio, particle, particleProvider, ConfirmationModal} from '../config'
import {underline, parseParams} from '../parseParams'
import {getAssetType, getAssetID, getAssetTypeAndId} from './asset'
import {getVaultID} from './vault'

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

export const depositERC20 = async (
    request: AxiosInstance,
    contractAddress: string,
    params: DepositParams,
    particle: any,
    assetDict: Asset
) => {

    try {
        contractAddress = '0x6D8909135Ce972189306347B1279252a96E72615'
        assetDict.tokenAddress = usdcContractAddress;
        const { assetType, assetId } = await getAssetTypeAndId(request, assetDict);
        await approve(params.quantizedAmount.toString(), usdcContractAddress);

        const { data } = await getVaultID(request, {
            starkKeys: params.starkKey,
            assetId,
        });

        console.log('entire asset:', {assetDict});

        const vaultId = data.data.vault_ids[0];

        if (!particle.auth.isLogin()) {
            await particle.auth.login();
        }
        const particleProvider = new ParticleProvider(particle.auth);
        const ethersProvider = new ethers.providers.Web3Provider(particleProvider, 'any');
        const signer = ethersProvider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const parsedAmount = ethers.utils.parseUnits(params.quantizedAmount.toString(), 6);
        console.log('Contract address:', contractAddress);
        console.log('Asset Type:', assetType);
        console.log('Vault ID:', vaultId);
        console.log('Parsed Amount:', parsedAmount.toString());
        console.log('Estimated Gas:', contract.estimatedGas);
        const tx = await contract.depositERC20(
            params.starkKey,
            assetType,
            vaultId,
            parsedAmount,
            { gasLimit: 3000000,  // Increased gas limit
            gasPrice: ethers.utils.parseUnits('25', 'gwei')
            }
        );
        console.log('Transaction sent:', tx.hash);
        await tx.wait();

        return tx;
    }
    catch (error) {
        // Handle error based on its type
        if (error instanceof Error) {
            console.error(`Error in depositERC20: ${error.message}`);
        }
        throw error;
    }
};