'use client';

import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
            Connect Wallet
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleMetaMaskConnect}>MetaMask</MenuItem>
            <MenuItem onClick={handleTronLinkConnect}>TronLink</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Display Connected Wallet Addresses as Buttons */}
      <Box p={4} marginLeft="200px">
        <Flex direction="column" gap={2}>
          {' '}
          {/* Stack buttons vertically with a gap of 2 */}
          {metaMaskAddress && (
            <Button
              colorScheme="blue" // Blue background for MetaMask
              isDisabled // Make the button unclickable
              _hover={{ cursor: 'default' }} // Disable hover effect
            >
              Connected (MetaMask): {metaMaskAddress}
            </Button>
          )}
          {tronLinkAddress && (
            <Button
              colorScheme="orange" // Orange background for TronLink
              isDisabled // Make the button unclickable
              _hover={{ cursor: 'default' }} // Disable hover effect
            >
              Connected (TronLink): {tronLinkAddress}
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
