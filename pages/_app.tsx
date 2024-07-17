import '@/styles/globals.css'
import './style/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app'
import { configureChains, sepolia } from "@wagmi/core";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createClient, WagmiConfig } from "wagmi";
import { publicProvider } from 'wagmi/providers/public'
import { ModalProvider } from "@particle-network/connectkit";
import { EthereumSepolia } from "@particle-network/chains";
import '@particle-network/connectkit/dist/index.css';
import { evmWallets, solanaWallets } from '@particle-network/connectors';


const { chains, provider } = configureChains(
  [sepolia],
  [
    publicProvider()
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: '6756806cba2601750f89e7fd325c28f1',
  chains
});

const wagmiConfig = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  // return <WagmiConfig client={wagmiConfig}>
  //   <RainbowKitProvider chains={chains}>
  //     <Component {...pageProps} />
  //   </RainbowKitProvider>
  // </WagmiConfig>

  return
  <WagmiConfig client={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <ModalProvider options={{
        projectId: "ac297642-d52d-46dc-9437-2afafdc87edf",
        clientKey: "cTHMhkM3NSaoZNYWOgz1USNAxqXRRfxkrfN8NlMn",
        appId: "468d50a2-a253-49c8-82b8-8647f682bed1",
        chains: [EthereumSepolia],
        connectors: [
          ...evmWallets({ projectId: process.env.REACT_APP_WALLETCONNECT_ID, showQrModal: true }),
          ...solanaWallets(),
        ],
        // erc4337: { //optional: account abstraction wallet UI config (displaying the smart account rather than EOA)
        //   name: "SIMPLE",
        //   version: "1.0.0"
        // },
        wallet: { //optional: particle wallet config
          customStyle: {
            supportChains: [EthereumSepolia],
          },
        },
      }}>
        <Component {...pageProps} />
      </ModalProvider>
    </RainbowKitProvider>
  </WagmiConfig>

}