import '@/styles/globals.css'
import './style/styles.css';
import type { AppProps } from 'next/app'
import {configureChains, sepolia, InjectedConnector, createClient, connect,} from "@wagmi/core";import {ModalProvider, useParticleProvider} from "@particle-network/connectkit";
import {EthereumSepolia} from "@particle-network/chains";
import '@particle-network/connectkit/dist/index.css';
import { evmWallets, solanaWallets } from '@particle-network/connectors';
import {AuthCoreContextProvider, PromptSettingType, useEthereum} from '@particle-network/auth-core-modal';
import {AuthType} from "@particle-network/auth-core";
import { publicProvider } from '@wagmi/core/providers/public'
import { createConfig } from 'wagmi'
import ScriptLoader from "../components/scriptLoader"
import {ethers} from "ethers";


// Wagmi/core config
const { chains, provider, webSocketProvider } = configureChains(
  [sepolia],
  [publicProvider()],
)
const config = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})
// const connector = new InjectedConnector({
//     chains: [sepolia]
// })
//
// const { account } = await connect({
//   connector: connector,
// })

export default function App({ Component, pageProps }: AppProps) {


    return (
        <AuthCoreContextProvider options={{
        projectId: "ac297642-d52d-46dc-9437-2afafdc87edf",
        clientKey: "cTHMhkM3NSaoZNYWOgz1USNAxqXRRfxkrfN8NlMn",
        appId: "468d50a2-a253-49c8-82b8-8647f682bed1",
        authTypes: [AuthType.email],
        themeType: 'dark',
        fiatCoin: 'USD',
        language: 'en',
        erc4337: {
          name: 'SIMPLE',
          version: '1.0.0',
        },
        wallet: {
          visible: true,
          customStyle: {
            supportChains: [EthereumSepolia],
          }
        },
      }}
     >
        <ScriptLoader src={"https://telegram.org/js/telegram-web-app.js"}></ScriptLoader>

            <Component {...pageProps} />
        </AuthCoreContextProvider>

    )



  // return <ModalProvider options={{
  //           projectId: "ac297642-d52d-46dc-9437-2afafdc87edf",
  //           clientKey: "cTHMhkM3NSaoZNYWOgz1USNAxqXRRfxkrfN8NlMn",
  //           appId: "468d50a2-a253-49c8-82b8-8647f682bed1",
  //           chains: [EthereumSepolia],
  //           connectors: [
  //               ...evmWallets({ projectId: "ac297642-d52d-46dc-9437-2afafdc87edf", showQrModal: true }),
  //               ...solanaWallets(),
  //           ],
  //           // erc4337: { //optional: account abstraction wallet UI config (displaying the smart account rather than EOA)
  //           //   name: "SIMPLE",
  //           //   version: "1.0.0"
  //           // },
  //           wallet: { //optional: particle wallet config
  //               customStyle: {
  //                   supportChains: [EthereumSepolia],
  //               },
  //           },
  //       }}>
  //   <Component {...pageProps} />
  // </ModalProvider>



    // return <AuthCoreContextProvider
    //   options={{
    //     projectId: "ac297642-d52d-46dc-9437-2afafdc87edf",
    //     clientKey: "cTHMhkM3NSaoZNYWOgz1USNAxqXRRfxkrfN8NlMn",
    //     appId: "468d50a2-a253-49c8-82b8-8647f682bed1",
    //     authTypes: [AuthType.email, AuthType.google, AuthType.twitter],
    //     themeType: 'dark',
    //     fiatCoin: 'USD',
    //     language: 'en',
    //     erc4337: {
    //       name: 'SIMPLE',
    //       version: '1.0.0',
    //     },
    //     promptSettingConfig: {
    //       promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
    //       promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
    //     },
    //     wallet: {
    //       visible: true,
    //       customStyle: {
    //         supportChains: [EthereumSepolia],
    //       }
    //     },
    //   }}
    // >
    // <Component {...pageProps} />
    // </AuthCoreContextProvider>
}