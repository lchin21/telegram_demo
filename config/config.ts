import {Reddio, SignTransferParams, RecordsParams, StarkKeyParams} from "@reddio.com/js";
import {ethers} from "ethers";
import {getAccount, SendTransactionResult} from "@wagmi/core";
import {arrayOutputType} from "zod";
import Modal from "../components/modal"
import {useState} from "react";
import { ParticleNetwork } from '@particle-network/auth';
import { ParticleProvider } from "@particle-network/provider";
import {useEthereum} from "@particle-network/auth-core-modal";


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


const generateKey = async () => {
    if (!particle.auth.isLogin()) {
    // Request user login if needed, returns current user info
    const userInfo = await particle.auth.login();
}
    console.log("generateKey function called")

    const account = await particle.evm.getAddress()
    console.log(account)
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
    const result = await particle.evm.signTypedDataUniq(message)
    key = reddio.keypair.generateFromSignTypedData(result);
}


const depositUSDC = async (amount: number) => {
    const tx = await reddio.erc20.approve({
        tokenAddress: usdcContractAddress,
        amount,
    });
    await tx.wait()
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
