import useSWR from "swr";
import {getBalance} from "@/config/config";
import {ethers} from "ethers";

export default function Balance() {
    const { data } = useSWR('balance', getBalance)
    const balanceData = data?.data[0]
    console.log(data?.data[0])
    return <b className={"balanceText"}>{ethers.utils.formatUnits(balanceData?.balance_available || 0, balanceData?.decimals)} USDC</b>
}


export function BalanceNumber() {
    const {data} = useSWR('balance', getBalance)
    const balanceData = data?.data[0]
    return <b className={"balanceText"}>$ {ethers.utils.formatUnits(balanceData?.balance_available || 0, balanceData?.decimals)}</b>
}