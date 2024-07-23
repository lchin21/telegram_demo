import React, {useCallback, useState} from "react";
import {depositUSDC} from "@/config/config";
import DynamicWidthInput from "@/components/dynamicEntryField";
import Modal from "@/components/modal";
import { particle } from "../config/config"
export default function Deposit() {

    const [amount, setAmount] = useState('')
    const deposit = useCallback(
        async (type: any) => {
            try {
                console.log(particle.auth.getUserInfo())
                if (!particle.auth.isLogin()) {
                    console.log("deposit: particle login: false")
                // Request user login if needed, returns current user info
                const userInfo = await particle.auth.login();
                    const address = await particle.evm.getAddress()
            }
                console.log("test2")
                await depositUSDC(amount)
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



    return(
        <Modal title="Deposit" customButton={
            <button className="Button green flex justify-center ml-0" onClick={deposit}>
                Deposit
            </button>}>
            <div className="flex items-center">
                <DynamicWidthInput onChange={handleInputChange} entryType={"tel"}></DynamicWidthInput>
                <label htmlFor="inputField" className="ml-1 text-2xl">USDC</label>
            </div>
        </Modal>

    );
}
