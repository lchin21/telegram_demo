import {RecordsParams, Reddio, SignTransferParams,} from "@reddio.com/js";
import {ethers} from "ethers";
import {ParticleNetwork, WalletEntryPosition,} from '@particle-network/auth';
import {ParticleProvider,} from "@particle-network/provider";
import {useEthereum,} from "@particle-network/auth-core-modal";
import {depositERC20} from "./DepositFunctionality/depositErc20";
import axios from 'axios';
import {Asset, Types, WithdrawalFromL1Params} from './DepositFunctionality/types'
import {withdrawalFromL1} from "@/config/WithdrawFunctionality/approveWithdraw";

let reddio: Reddio;
let key: {
    privateKey: string;
    publicKey: string;
};

const request = axios.create({
    baseURL: 'https://api-dev.reddio.com',
});

const usdcContractAddress = '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8'

const initReddio = () => {
    if (typeof window !== 'undefined' && !reddio) {
        reddio = new Reddio({
            env: 'test',
        });
    }
};


const particle = new ParticleNetwork({
    projectId: "ac297642-d52d-46dc-9437-2afafdc87edf",
    clientKey: "cTHMhkM3NSaoZNYWOgz1USNAxqXRRfxkrfN8NlMn",
    appId: "468d50a2-a253-49c8-82b8-8647f682bed1",
    chainName: "ethereum", // Optional: resolves to 'ethereum' both in this case & by default
    chainId: 11155111, // Optional: resolves to 1 both in this case & by default
    wallet: {   // Optional: object controlling additional configurations
        displayWalletEntry: true,  // Whether or not the wallet popup is shown on-screen after login
        defaultWalletEntryPosition: WalletEntryPosition.BR, // If the former is true, the position in which the popup appears
        uiMode: "dark",  // Light or dark, if left blank, aligns with web auth default
        supportChains: [{id: 11155111, name: "ethereum"}], // Restricts the chains available within the web wallet interface
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

export const particleProvider = new ParticleProvider(particle.auth);
export const ethersProvider = new ethers.providers.Web3Provider(particleProvider, "any");


export const ConfirmationModal = () => {
    const {provider} = useEthereum();
}


const generateKey = async () => {
    if (typeof window !== "undefined" && window.localStorage) {
        if (window.localStorage.getItem("signature") === null) {
            if (!particle.auth.isLogin()) {
                const userInfo = await particle.auth.login();
            }

            const address = await particle.evm.getAddress()
            const message = {

                primaryType: 'Reddio',
                types: {
                    EIP712Domain: [{name: 'chainId', type: 'uint256'}],
                    Reddio: [{name: 'contents', type: 'string'}],
                },
                domain: {
                    chainId: 5
                },
                message: {
                    contents: 'Generate layer 2 key'
                }
            }


            const provider = new ParticleProvider(particle.auth);
            const result = await provider.request({method: 'personal_sign_uniq', params: [address, message]});
            //cloud storage, should remove once particle-telegram connection is implemented
            window.localStorage.setItem("signature", result)
            key = reddio.keypair.generateFromSignTypedData(result);
        } else {
            key = reddio.keypair.generateFromSignTypedData(window.localStorage.getItem("signature")!)
        }
    }
}


const depositUSDC = async (amount: number) => {
    const address = await particle.evm.getAddress();
    if (!address) {
        throw new Error("Failed to retrieve the address.");
    }

    const assetDict: Asset = {
        type: Types.ERC20,
        tokenAddress: usdcContractAddress,

    };

    const result = await depositERC20(
        request,
        usdcContractAddress,
        {
            starkKey: key.publicKey,
            quantizedAmount: amount
        },
        particle,
        assetDict
    );

    return result;
};


const withdrawUSDC = async (amount: number) => {
    const address = await particle.evm.getAddress()

    const params: SignTransferParams = {
        starkKey: key.publicKey,
        privateKey: key.privateKey,
        amount,
        receiver: address!,
        type: 'ERC20',
        contractAddress: usdcContractAddress,
    };
    return reddio.apis.withdrawalFromL2(params)
}

const getBalance = async () => {
    const {data} = await reddio.apis.getBalancesV3({
        starkKey: key.publicKey,
        contractAddress: usdcContractAddress,
    })
    return data
}

//to return how much USDC is available to withdraw to wallet
const getWithdrawArea = async () => {
    const address = await particle.evm.getAddress();
    const {data} = await reddio.apis.withdrawalStatus({
        ethaddress: address!,
        stage: 'withdrawarea',
    });

    return data
}


const withdrawToWallet = async (item: any) => {
    const params: WithdrawalFromL1Params = {
        // @ts-ignore
        ethAddress: await particle.evm.getAddress(),
        assetType: Types.ERC20,
        type: 'ERC20',
    }

    return withdrawalFromL1(
        '0x6D8909135Ce972189306347B1279252a96E72615',
        params
    )
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

const records = async () => {

    const params: RecordsParams = {
        starkKey: key.publicKey,
    };

    try {
        const response = await reddio.apis.getRecords(params);
        const responseData = response.data.data;
        return responseData.list;

    } catch (error) {
        throw error;
    }
}


export {
    initReddio,
    generateKey,
    depositUSDC,
    getBalance,
    withdrawUSDC,
    getWithdrawArea,
    withdrawToWallet,
    transfer,
    records,
    key,
    reddio,
    particle
}
