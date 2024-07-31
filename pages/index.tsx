import React, {useEffect, useState} from 'react'
// import {ConnectButton} from "@particle-network/connectkit";
import * as Tabs from '@radix-ui/react-tabs'
import * as Dialog from '@radix-ui/react-dialog';
import Deposit from "@/components/deposit";
import {watchAccount} from "@wagmi/core";
import {initReddio, generateKey, getBalance} from "@/config/config";
import Balance, {BalanceNumber} from "@/components/balance";
import Withdraw from "@/components/withdraw";
import WithdrawArea from "@/components/withdrawArea";
import Button from "@/components/buttons";
import Transfer from "@/components/transfer";
import History from "@/components/history";
import Modal from "@/components/modal";
import ApprovalArea from "@/components/approvalArea";
import Info from "@/components/info";
import ScriptLoader from "@/components/scriptLoader";
import scriptLoader from "@/components/scriptLoader";
let isInit = false



const TabsDemo = () => {
    const [signature, setSignature] = useState(null);
  useEffect(() => {
    initReddio()
    watchAccount(async (account) => {
      if (account.address && !isInit) {
        isInit = true
        await generateKey()
          // setSignature(localStorage.getItem("signature")!)
      }
    });
  }, []);


useEffect(() => {
  const script = document.createElement('script');

  script.src = "https://telegram.org/js/telegram-web-app.js";
  script.async = true;

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  }
}, []);
//





  return (
      <main className='h-screen bg-gray-100'>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <header className='h-[50px] flex justify-center mb-5 mt-0'>
              {/*<ConnectButton*/}
              {/*showBalance={false}*/}
              {/*accountStatus={{*/}
              {/*  smallScreen: 'avatar',*/}
              {/*  largeScreen: 'avatar',*/}
              {/*}}/>*/}
              {/*  <ConnectButton/>*/}
          </header>
          <div className='flex justify-center mb-7 mt-0 text-5xl text-black'>
              <BalanceNumber/>
          </div>

          <div className='justify-center gap-1 flex-1 grid grid-cols-2 px-3'>
              {/*<Modal title="Deposit" customButton={<button className="Button green" onClick={deposit}>Deposit</button>}>*/}
              {/*    <Deposit/></Modal>*/}
              <Deposit/>
              <Withdraw/>
              <ApprovalArea/>
              <Transfer/>
              <Modal title="History"><History/></Modal>
              <Info/>
              <b>Version 1</b>
          </div>
      </main>
  )
}

export default TabsDemo
