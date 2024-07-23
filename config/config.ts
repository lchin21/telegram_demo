import {Reddio, SignTransferParams, RecordsParams, StarkKeyParams} from "@reddio.com/js";
import {BigNumber, ethers} from "ethers";
import {
    getAccount,
    InjectedConnector,
    prepareWriteContract,
    readContract,
    SendTransactionResult, sepolia,
    writeContract,
    connect,

} from "@wagmi/core";
import {arrayOutputType} from "zod";
import Modal from "../components/modal"
import {useState} from "react";
import {ParticleNetwork, WalletEntryPosition, EVMProvider} from '@particle-network/auth';
import { ParticleProvider, } from "@particle-network/provider";
import {useEthereum, useConnect,} from "@particle-network/auth-core-modal";
import { walletEntryPlugin, EntryPosition, } from '@particle-network/wallet'
import {Ethereum, EthereumSepolia} from "@particle-network/chains"; // Optional
import abi from "./abi.json"
import {erc20Approve} from "@/components/erc20Approval";
import {  }  from "@particle-network/connectkit"
import {  } from "@particle-network/aa"
import  EvmService from "@particle-network/auth/lib/types/service/evmService";
import {localStorage} from "@aws-sdk/credential-provider-cognito-identity/dist-types/localStorage";



let reddio: Reddio;
let key: {
    privateKey: string;
    publicKey: string;
};

const usdcContractAddress =  '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8'

const initReddio = () => {
    if (typeof window !== 'undefined' && !reddio) {
        reddio = new Reddio({
            env: 'test',
        });
    }
};



export const particle = new ParticleNetwork({
  projectId: "ac297642-d52d-46dc-9437-2afafdc87edf",
  clientKey: "cTHMhkM3NSaoZNYWOgz1USNAxqXRRfxkrfN8NlMn",
  appId: "468d50a2-a253-49c8-82b8-8647f682bed1",
  chainName: "ethereum", // Optional: resolves to 'ethereum' both in this case & by default
  chainId: 11155111, // Optional: resolves to 1 both in this case & by default
  wallet: {   // Optional: object controlling additional configurations
    displayWalletEntry: true,  // Whether or not the wallet popup is shown on-screen after login
    defaultWalletEntryPosition: WalletEntryPosition.BR, // If the former is true, the position in which the popup appears
    uiMode: "dark",  // Light or dark, if left blank, aligns with web auth default
    supportChains: [{ id: 11155111, name: "ethereum"}], // Restricts the chains available within the web wallet interface
    customStyle: {}, // If applicable, custom wallet style in JSON
  },
  securityAccount: { // Optional: Configuration of security requirements upon login
    // If, and in what frequency, will the user be prompted to set a payment password
    // 0: None, 1: Once (default), 2: Always
    promptSettingWhenSign: 1,
    // If, and in what frequency, will the user be prompted to set a master password
    // 0: None (default), 1: Once, 2: Always
    promptMasterPasswordSettingWhenLogin: 1
  },
});

const particleProvider = new ParticleProvider(particle.auth);

const ConfirmationModal = () => {
    const { provider } = useEthereum();

    const ethersProvider = new ethers.providers.Web3Provider(provider, "any");
}

// walletEntryPlugin.init({
//     projectId: 'ac297642-d52d-46dc-9437-2afafdc87edf'!,
//     clientKey: 'cTHMhkM3NSaoZNYWOgz1USNAxqXRRfxkrfN8NlMn',
//     appId: '468d50a2-a253-49c8-82b8-8647f682bed1',
//   }, {
//     erc4337: { // Optional
//       name: "SIMPLE", // SIMPLE, LIGHT, BICONOMY, or CYBERCONNECT
//       version: "1.0.0"
//     },
//     visible: true, // Optional
//     preload: true, // Optional
//     entryPosition: EntryPosition.BR, // Optional
//     topMenuType: 'close' // Optional
//     // And so on.
// });


const generateKey = async () => {
    // window.localStorage.removeItem("signature")
    if (typeof window !== "undefined" && window.localStorage) {
    if (window.localStorage.getItem("signature") === null) {
    if (!particle.auth.isLogin()) {
    // Request user login if needed, returns current user info
    const userInfo = await particle.auth.login();
}

    const address = await particle.evm.getAddress()
    const message = {

        primaryType: 'Reddio',
        types: {
            EIP712Domain: [{ name: 'chainId', type: 'uint256' }],
            Reddio: [{ name: 'contents', type: 'string' }],
        },
        domain: {
            chainId: 5
        },
        message: {
            contents: 'Generate layer 2 key'
        }
    }

    // @ts-ignore
    // const result = await particle.evm.signTypedDataUniq(message)
    const provider = new ParticleProvider(particle.auth);
    const result = await provider.request({method: 'personal_sign_uniq', params: [address, message]});
    window.localStorage.setItem("signature", result)
        console.log(result)
        console.log(window.localStorage.getItem("signature"));
    key = reddio.keypair.generateFromSignTypedData(result);}
    else {
        key = reddio.keypair.generateFromSignTypedData(window.localStorage.getItem("signature")!)

        // @ts-ignore
        console.log("else failed");
    }
}
}



const erc20Address = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8"; // Replace with actual ERC20 contract address
const erc20Abi = [
  "function approve(address spender, uint256 amount) public returns (bool)"
];
async function approve(amount: string, address: string) {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== 'undefined') {
      console.log("If statement passes")
    try {
      // Request user to connect their wallet
        if (!particle.auth.isLogin()) { // Boolean based upon login state of session
            console.log("waiting for log in")
    // Request user login if needed, returns current user info, such as name, email, etc.
    const userInfo = await particle.auth.login();
}
      const particleProvider = new ParticleProvider(particle.auth);
        // Create an Ethereum provider
      const ethersProvider = new ethers.providers.Web3Provider(particleProvider, "any");
      // Get the signer (the currently connected wallet)
      const signer = ethersProvider.getSigner();
      // Create a contract instance
      const erc20Contract = new ethers.Contract(erc20Address, erc20Abi, signer);
      // Set the spender address and amount
      const spenderAddress = "0x6D8909135Ce972189306347B1279252a96E72615";
      // Replace with actual spender address
      const amount = ethers.utils.parseUnits("10.0", 18);
      // Replace with actual amount
        // Call the approve method
      const tx = await erc20Contract.approve(spenderAddress, amount);
      console.log(`Transaction hash: ${tx.hash}`);
      // Wait for the transaction to be confirmed by miners
      await tx.wait();
      console.log("Transaction confirmed");
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  } else {
    console.log("MetaMask is not installed!");
  }
}


const depositUSDC = async (value: string) => {
    let amount = value.toString()
    // @ts-ignore
    const tx = await reddio.erc20.approve({
        tokenAddress: usdcContractAddress,
        amount,
    });
    console.log("test1")
    const address = await particle.evm.getAddress()
    // const tx = await approve(String(amount), address!)
    // await tx.wait()
    // await generateKey()
    return reddio.apis.depositERC20({
        starkKey: key.publicKey,
        quantizedAmount: amount,
        tokenAddress: usdcContractAddress,
    });
}


const withdrawUSDC = async (amount: number) => {
    const params: SignTransferParams = {
        starkKey: key.publicKey,
        privateKey: key.privateKey,
        amount,
        receiver: getAccount().address!,
        type: 'ERC20',
        contractAddress: usdcContractAddress,
    };
    return reddio.apis.withdrawalFromL2(params)
}

const getBalance = async () => {
    const { data } = await reddio.apis.getBalancesV3({
        starkKey: key.publicKey,
        contractAddress: usdcContractAddress,
    })
    return data
}

const getWithdrawArea = async () => {
    const { data } = await reddio.apis.withdrawalStatus({
        ethaddress: getAccount().address!,
        stage: 'withdrawarea',
    });
    return data
}

const getTransferApproveArea = async (address: string) => {
    const { data } = await reddio.apis.withdrawalStatus({
        ethaddress: address!,
        stage: 'withdrawarea',
    });
    return data
}

const withdrawToWallet = async (item: any) => {
    return reddio.apis.withdrawalFromL1({
        ethAddress: getAccount().address!,
        type: item.type,
        assetType: item.asset_type,
    });
}

const transfer = async (amount: string, receiver: string): Promise<any> => {
    const params: SignTransferParams = {
        starkKey: key.publicKey,
        privateKey: key.privateKey,
        amount: amount,
        receiver: receiver!,
        type: 'ERC20',
        contractAddress: usdcContractAddress,
    };
    return reddio.apis.transfer(params)
}

const records = async ()  => {

    const params: RecordsParams = {
        starkKey: key.publicKey,
    };

    try {
        const response = await reddio.apis.getRecords(params);
        const responseData = response.data.data;
        const list = responseData.list;

        console.log(typeof list);
        return list;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



export { initReddio, generateKey, depositUSDC, getBalance, withdrawUSDC, getWithdrawArea, withdrawToWallet, transfer, getTransferApproveArea, records, key }
