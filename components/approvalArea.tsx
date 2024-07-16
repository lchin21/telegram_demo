import React, {useCallback, useState} from "react";
import {getBalance, getWithdrawArea, withdrawToWallet, withdrawUSDC} from "@/config/config";
import useSWR from "swr";
import {ethers} from "ethers";
import Modal from "@/components/modal";

export default function ApprovalArea() {
    const { data } = useSWR('getWithdrawArea', getWithdrawArea)

    const value = data?.data[0]?.display_value || 0

    const [amount, setAmount] = useState('')
    const withdraw = useCallback(
        async (type: any) => {
            try {
                await withdrawToWallet(data?.data[0])
            } catch (e) {
                console.log(e);
            }
        },
        [data?.data],
    );


    return <Modal title={"Approve"} customButton={
        <button className="Button green flex justify-center ml-0" onClick={withdraw}>
        Approve
        </button>
        }>
        <div>
        <p className="Text">
            You can withdraw {value} USDC to your wallet here.
            </p>
            <div
                style={{display: 'flex', marginTop: 20, justifyContent: 'flex-end'}}
            >
            </div>
        </div>
    </Modal>


}
