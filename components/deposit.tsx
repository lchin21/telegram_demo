import React, {useCallback, useState} from "react";
import {depositUSDC} from "@/config/config";
import DynamicWidthInput from "@/components/dynamicEntryField";
import Modal from "@/components/modal";
import { particle,} from "../config/config"
import {ParticleProvider} from "@particle-network/provider";
export default function Deposit() {

    const particleProvider = new ParticleProvider(particle.auth);

    const [amount, setAmount] = useState('')

    const handleInputChange = (value: string) => {
            setAmount(value);
        }


    const deposit = useCallback(
        async (type: any) => {
            if (!particle.auth.isLogin()) {
                const userInfo = await particle.auth.login();
            }
            try {
                await depositUSDC(Number(amount))
            } catch (e) {
                console.log(e);
            }
            },
        [amount],
    );

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
