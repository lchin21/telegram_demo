import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import {Ethereum, EthereumSepolia} from "@particle-network/chains"; // Optional

const particle = new ParticleNetwork({
  projectId: "ac297642-d52d-46dc-9437-2afafdc87edf",
  clientKey: "cTHMhkM3NSaoZNYWOgz1USNAxqXRRfxkrfN8NlMn",
  appId: "468d50a2-a253-49c8-82b8-8647f682bed1",
  chainName: EthereumSepolia.name, // Optional: resolves to 'ethereum' both in this case & by default
  chainId: EthereumSepolia.id, // Optional: resolves to 1 both in this case & by default
  wallet: {   // Optional: object controlling additional configurations
    displayWalletEntry: true,  // Whether or not the wallet popup is shown on-screen after login
    defaultWalletEntryPosition: WalletEntryPosition.BR, // If the former is true, the position in which the popup appears
    uiMode: "dark",  // Light or dark, if left blank, aligns with web auth default
    supportChains: [{ id: 1, name: "Ethereum"}, { id: 11155111, name: "EthereumSepolia"}], // Restricts the chains available within the web wallet interface
    customStyle: {}, // If applicable, custom wallet style in JSON
  },
  securityAccount: { // Optional: Configuration of security requirements upon login
    // If, and in what frequency, will the user be prompted to set a payment password
    // 0: None, 1: Once (default), 2: Always
    promptSettingWhenSign: 1,
    // If, and in what frequency, will the user be prompted to set a master password
    // 0: None (default), 1: Once, 2: Always
    promptMasterPasswordSettingWhenLogin: 1
  },
});