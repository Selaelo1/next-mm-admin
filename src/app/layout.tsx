import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import WalletConnection from '../components/WalletConnection';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'}>
        <AppWrappers>
          {/* Add Wallet Connection Button and Addresses */}
          <WalletConnection />
          {children}
        </AppWrappers>
      </body>
    </html>
  );
}
