// global.d.ts
import { ethers } from 'ethers';
import TronWeb from 'tronweb';

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
    tronWeb?: typeof TronWeb & {
      request: (args: { method: string }) => Promise<void>;
      defaultAddress: {
        base58: string;
      };
    };
  }
}