import {Reddio, SignTransferParams, RecordsParams, StarkKeyParams} from "@reddio.com/js";
import {ethers } from "ethers";
import {getAccount, SendTransactionResult,} from "@wagmi/core";
import {arrayOutputType} from "zod";
import Modal from "../components/modal"
import {useState} from "react";
import { ParticleNetwork } from '@particle-network/auth';
import { ParticleProvider } from "@particle-network/provider";
import {useEthereum, useConnect} from "@particle-network/auth-core-modal";
import { walletEntryPlugin, EntryPosition} from '@particle-network/wallet'
import {Ethereum, EthereumSepolia} from "@particle-network/chains"; // Optional






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


const particle = new ParticleNetwork({
  appId: '468d50a2-a253-49c8-82b8-8647f682bed1',
  clientKey: 'cTHMhkM3NSaoZNYWOgz1USNAxqXRRfxkrfN8NlMn',
  projectId: 'ac297642-d52d-46dc-9437-2afafdc87edf',
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
    if (typeof window !== "undefined" && window.localStorage) {
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
    key = reddio.keypair.generateFromSignTypedData(result);
}
}


// ERC-20 contract address and ABI (partially)
const erc20Address = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8"; // Replace with actual ERC20 contract address
const erc20Abi = [
  "function approve(address spender, uint256 amount) public returns (bool)"
];    // Approve function
async function approve(amount: number, address: string) {
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
      const particleProvider = new ParticleProvider(particle.auth);     // Create an Ethereum provider
      const ethersProvider = new ethers.providers.Web3Provider(particleProvider, "any");        // Get the signer (the currently connected wallet)
      const signer = ethersProvider.getSigner();          // Create a contract instance
      const erc20Contract = new ethers.Contract(erc20Address, erc20Abi, signer);          // Set the spender address and amount
      const spenderAddress = address; // Replace with actual spender address
      const amount = ethers.utils.parseUnits("10.0", 18); // Replace with actual amount          // Call the approve method
      const tx = await erc20Contract.approve(spenderAddress, amount);
      console.log(`Transaction hash: ${tx.hash}`);          // Wait for the transaction to be confirmed by miners
      await tx.wait();
      console.log("Transaction confirmed");
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  } else {
    console.log("MetaMask is not installed!");
  }
}


const depositUSDC = async (amount: number) => {
    // @ts-ignore
    // const tx = await reddio.erc20.approve({
    //     tokenAddress: usdcContractAddress,
    //     amount,
    // });
    console.log("test1")
    const address = await particle.evm.getAddress()
    await approve(amount, address!)
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
