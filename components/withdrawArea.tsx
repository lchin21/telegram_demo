import React, {useCallback, useState, useEffect} from "react";
import {getBalance, getWithdrawArea, particle, withdrawToWallet, withdrawUSDC} from "@/config/config";
import useSWR from "swr";
import {ethers} from "ethers";



export default function WithdrawArea() {
    // const { data } =  useSWR('getWithdrawArea', getWithdrawArea)
      const [amount, setAmount] = useState('')
    const [responseData, setResponseData] = useState({})



    useEffect (() => {
        const getData = async () => {
            const response = await getWithdrawArea()
            const responseData = response.data
            console.log(responseData)
            // @ts-ignore
            setAmount(responseData.data.data[0].amount)
            setResponseData(responseData)
        }
        console.log('checkpoint 1')
        getData();
    }, []);

    // const value = getData()

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

    return <div>
        <p className="Text">
            You can withdraw {amount} USDC to your wallet here.
        </p>
        <div
            style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}
        >
            <button className="Button green" onClick={withdraw}>Withdraw</button>
        </div>
    </div>
}
