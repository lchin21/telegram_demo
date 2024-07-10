import React, {useCallback, useState} from "react";
import {depositUSDC} from "@/config/config";
import DynamicWidthInput from "@/components/dynamicEntryField";
import Modal from "@/components/modal";
export default function Deposit() {
    const [amount, setAmount] = useState('')
    const deposit = useCallback(
        async (type: any) => {
            try {
                await depositUSDC(Number(amount))
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
    //         You can deposit USDC to your account here.
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
    //         <button className="Button green" onClick={deposit}>Deposit</button>
    //     </div>
    // </div>

    return(
        <Modal title="Deposit" customButton={
            <button className="Button green flex justify-center ml-0" onClick={deposit}>
                Deposit
            </button>}>
            <div className="flex items-center">
                <DynamicWidthInput onChange={handleInputChange}></DynamicWidthInput>
                <label htmlFor="inputField" className="ml-1 text-2xl">USDC</label>
            </div>
        </Modal>

    );
}
