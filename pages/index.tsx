import React, {useEffect} from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
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

let isInit = false

const TabsDemo = () => {
  useEffect(() => {
    initReddio()
    watchAccount(async (account) => {
      if (account.address && !isInit) {
        isInit = true
        await generateKey()
      }
    });
  }, []);


  return (
      <main className='h-screen bg-gray-100'>
        <header className='h-[50px] flex justify-center mb-5 mt-0'>
          <ConnectButton
          showBalance={false}
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'avatar',
          }}/>
        </header>
          <div className='flex justify-center mb-7 mt-0 text-5xl text-black'>
              <BalanceNumber/>
          </div>

        <div className='justify-center gap-1 flex-1 grid grid-cols-2 px-3'>
            {/*<Modal title="Deposit" customButton={<button className="Button green" onClick={deposit}>Deposit</button>}>*/}
            {/*    <Deposit/></Modal>*/}
            <Deposit/>
            <Withdraw/>
            <Modal title="Approve">Approve</Modal>
            <Modal title="History"><History/></Modal>
        </div>
        {/*<div className={'flex justify-center h-12'}>*/}
        {/*  <Balance />*/}
        {/*</div>*/}
        {/*<div className={'flex justify-center h-12'}>*/}
        {/*  <Button>Test</Button>*/}
        {/*</div>*/}
        {/*<div className='flex justify-center items-center '>*/}
        {/*  <Tabs.Root className="TabsRoot" defaultValue="tab1">*/}
        {/*    <Tabs.List className="TabsList" aria-label="Manage your account">*/}
        {/*      <Tabs.Trigger className="TabsTrigger" value="tab1">*/}
        {/*        Deposit*/}
        {/*      </Tabs.Trigger>*/}
        {/*      <Tabs.Trigger className="TabsTrigger" value="tab2">*/}
        {/*        Withdraw*/}
        {/*      </Tabs.Trigger>*/}
        {/*      <Tabs.Trigger className="TabsTrigger" value="tab3">*/}
        {/*        Withdraw Area*/}
        {/*      </Tabs.Trigger>*/}
        {/*      <Tabs.Trigger className="TabsTrigger" value="tab4">*/}
        {/*        Balance*/}
        {/*      </Tabs.Trigger>*/}
        {/*    </Tabs.List>*/}
        {/*    <Tabs.Content className="TabsContent" value="tab1">*/}
        {/*      <Deposit />*/}
        {/*    </Tabs.Content>*/}
        {/*    <Tabs.Content className="TabsContent" value="tab2">*/}
        {/*      <Transfer />*/}
        {/*    </Tabs.Content>*/}
        {/*    <Tabs.Content className="TabsContent" value="tab3">*/}
        {/*      <WithdrawArea />*/}
        {/*    </Tabs.Content>*/}
        {/*    <Tabs.Content className="TabsContent" value="tab4">*/}
        {/*      /!*<Balance />*!/*/}
        {/*      <History />*/}
        {/*    </Tabs.Content>*/}
        {/*  </Tabs.Root>*/}
        {/*</div>*/}
      </main>
  )
}

export default TabsDemo
