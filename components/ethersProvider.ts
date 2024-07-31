import { useEthereum } from '@particle-network/auth-core-modal';
import { ethers } from 'ethers';

export function getEthersProvider(): ethers.providers.Web3Provider | null {
  // This assumes `useEthereum` is used in a React component context
  // and is only for illustrative purposes
  const { provider } = useEthereum();

  if (provider) {
    return new ethers.providers.Web3Provider(provider, "any");
  }

  return null;
}
