import React, {useCallback, useState} from "react";
import {getBalance, transfer} from "@/config/config";
import useSWR from "swr";
import {ethers} from "ethers";

export default function Transfer() {
    const { data } = useSWR('balance', getBalance)
    const balanceData = data?.data[0]

    const [amount, setAmount] = useState('')
    const [address, setAddress] = useState('')

    const transfer2 = useCallback(
        async (type: any) => {
            try {
                await transfer(Number(amount), address)
            } catch (e) {
                console.log(e);
            }
        },
        [amount],
    );

    return <div>
        <p className="Text">
            You can transfer up to {ethers.utils.formatUnits(balanceData?.balance_available || 0, balanceData?.decimals)} USDC here.
        </p>
        <fieldset className="Fieldset">
            <label className="Label" htmlFor="amount">
                Amount
            </label>
            <input className="Input" id="amount" onChange={e => setAmount(e.target.value) } />

            <label className="Label" htmlFor="address" style={{marginTop: 20}}>
                Address
            </label>
            <input className="Input" id="address" onChange={e => setAddress(e.target.value) } />
        </fieldset>
        <div
            style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}
        >
            <button className="Button green" onClick={transfer2}>Send</button>
        </div>
    </div>
}
