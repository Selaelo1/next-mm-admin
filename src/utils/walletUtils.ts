import { ethers } from 'ethers';

interface MetaMaskConnection {
  provider: ethers.BrowserProvider;
  signer: ethers.JsonRpcSigner;
  address: string;
}

export const connectMetaMask = async (): Promise<MetaMaskConnection> => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return { provider, signer, address };
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      throw error;
    }
  } else {
    throw new Error('MetaMask is not installed');
  }
};