import React, {useCallback, useState, useEffect} from "react";
import {getBalance, getWithdrawArea, particle, withdrawToWallet, withdrawUSDC} from "@/config/config";
import useSWR from "swr";
import {ethers} from "ethers";
import Modal from "@/components/modal";



export default function WithdrawArea() {
    const [amount, setAmount] = useState('')
    const [responseData, setResponseData] = useState({})


    useEffect(() => {
        const getData = async () => {
            const response = await getWithdrawArea()
            console.log(responseData)
            // @ts-ignore
            setAmount(responseData.data.data[0].amount)
            setResponseData(responseData)
        }
        console.log('checkpoint 1')
        getData();
    }, []);


    console.log(amount)
    const withdraw = useCallback(
        async (type: any) => {
            try {
                await withdrawToWallet(amount)
            } catch (e) {
                console.log(e);
            }
        },
        [amount],
    );


    return <Modal title={"Approve"} customButton={
        <button className="Button green flex justify-center ml-0" onClick={withdraw}>
            Approve
        </button>
    }>
        <div>
            <p className="Text">
                You can withdraw {amount} USDC to your wallet here.
            </p>
            <div
                style={{display: 'flex', marginTop: 20, justifyContent: 'flex-end'}}
            >
            </div>
        </div>
    </Modal>
}