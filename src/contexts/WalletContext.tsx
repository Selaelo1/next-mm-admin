'use client';

import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Flex,
  Box,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import TronWeb from 'tronweb';
import { useState } from 'react';

// MetaMask Connection
const connectMetaMask = async () => {
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

// TronLink Connection
const connectTronLink = async () => {
  if (window.tronWeb) {
    try {
      await window.tronWeb.request({ method: 'tron_requestAccounts' });
      const address = window.tronWeb.defaultAddress.base58;
      return { tronWeb: window.tronWeb, address };
    } catch (error) {
      console.error('Error connecting to TronLink:', error);
      throw error;
    }
  } else {
    throw new Error('TronLink is not installed');
  }
};

export default function WalletConnection() {
  const [metaMaskAddress, setMetaMaskAddress] = useState<string>('');
  const [tronLinkAddress, setTronLinkAddress] = useState<string>('');

  const handleMetaMaskConnect = async () => {
    try {
      const { address } = await connectMetaMask();
      setMetaMaskAddress(address);
      alert(`Connected to MetaMask: ${address}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  const handleTronLinkConnect = async () => {
    try {
      const { address } = await connectTronLink();
      setTronLinkAddress(address);
      alert(`Connected to TronLink: ${address}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  return (
    <Box>
      {/* Wallet Connection Button */}
      <Flex
        justifyContent="flex-end"
        p={4}
        position="sticky"
        top={0}
        zIndex={1}
        bg="secondaryGray.300"
      >
        <Menu>
          <MenuButton as={Button} colorScheme="blue">
            {metaMaskAddress || tronLinkAddress
              ? `Connected: ${metaMaskAddress || tronLinkAddress}`
              : 'Connect Wallet'}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleMetaMaskConnect}>MetaMask</MenuItem>
            <MenuItem onClick={handleTronLinkConnect}>TronLink</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Display Connected Wallet Addresses */}
      <Box p={4}>
        {metaMaskAddress && (
          <Text mb={2}>
            Connected (MetaMask):{' '}
            <a
              href={`https://etherscan.io/address/${metaMaskAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {metaMaskAddress}
            </a>
          </Text>
        )}
        {tronLinkAddress && (
          <Text mb={2} color="orange.500">
            {' '}
            {/* Orange color for TronLink */}
            Connected (TronLink):{' '}
            <a
              href={`https://tronscan.org/#/address/${tronLinkAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tronLinkAddress}
            </a>
          </Text>
        )}
      </Box>
    </Box>
  );
}
