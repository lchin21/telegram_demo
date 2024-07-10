import React, {useCallback, useState} from "react";
import {getBalance, withdrawUSDC} from "@/config/config";
import useSWR from "swr";
import {ethers} from "ethers";
import Modal from "@/components/modal";
import DynamicWidthInput from "@/components/dynamicEntryField";

export default function Withdraw() {
    const { data } = useSWR('balance', getBalance)
    const balanceData = data?.data[0]

    const [amount, setAmount] = useState('')
    const withdraw = useCallback(
        async (type: any) => {
            try {
                await withdrawUSDC(Number(amount))
            } catch (e) {
                console.log(e);
            }
        },
        [amount],
    );

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (value: string) => {
        setAmount(value);
    }
    // return <div>
    //     <p className="Text">
    //         You can withdraw {ethers.utils.formatUnits(balanceData?.balance_available || 0, balanceData?.decimals)} USDC to withdraw area here.
    //     </p>
    //     <fieldset className="Fieldset">
    //         <label className="Label" htmlFor="amount">
    //             Amount
    //         </label>
    //         <input className="Input" id="amount" onChange={e => setAmount(e.target.value) } />
    //     </fieldset>
    //     <div
    //         style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}
    //     >
    //         <button className="Button green" onClick={withdraw}>Withdraw</button>
    //     </div>
    // </div>
    return(
        <Modal title="Withdraw" customButton={
            <button className="Button green flex justify-center ml-0" onClick={withdraw}>
                Withdraw
            </button>}>
            <div className="flex items-center">
                <DynamicWidthInput onChange={handleInputChange}></DynamicWidthInput>
                <label htmlFor="inputField" className="ml-1 text-2xl">USDC</label>
            </div>

        </Modal>
    )
}
