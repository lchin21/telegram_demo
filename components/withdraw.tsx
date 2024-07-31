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
                console.log('withdraw function called')
            } catch (error) {
                console.log('withdraw not called');
                // console.log(error);

            }
        },
        [amount],
    );

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (value: string) => {
        setAmount(value);
    }

    return(
        <Modal title="Withdraw" customButton={
            <button className="Button green flex justify-center ml-0" onClick={withdraw}>
                Withdraw
            </button>}>
            <div className="flex items-center">
                <DynamicWidthInput onChange={handleInputChange} entryType={"tel"}></DynamicWidthInput>
                <label htmlFor="inputField" className="ml-1 text-2xl">USDC</label>
            </div>

        </Modal>
    )
}
