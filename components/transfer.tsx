import React, {useCallback, useState} from "react";
import {getBalance, transfer} from "@/config/config";
import useSWR from "swr";
import {ethers} from "ethers";
import Modal from "@/components/modal";
import DynamicWidthInput from "@/components/dynamicEntryField";

export default function Transfer() {
    const { data } = useSWR('balance', getBalance)
    const balanceData = data?.data[0]

    const [amount, setAmount] = useState('')
    const [address, setAddress] = useState('')

    const transfer2 = useCallback(
        async (type: any) => {
            try {
                await transfer(amount, address)
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

    const handleInputKeyChange = (value: string) => {
        setAddress(value);
    }


    return <Modal title={"Transfer"} customButton={
        <button className="Button green flex justify-center ml-0" onClick={transfer2}>
            Transfer
        </button>
    }>
        <div className="flex items-center">
            <DynamicWidthInput onChange={handleInputChange}></DynamicWidthInput>
            <label htmlFor="inputField" className="ml-1 text-2xl">USDC</label>
        </div>
        <div className="flex items-center mt-3">
            <DynamicWidthInput onChange={handleInputKeyChange} defaultValue={"StarkKey"}
                               minWidth={"90px"}></DynamicWidthInput>
        </div>


    </Modal>
}
