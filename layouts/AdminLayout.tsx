import React, { ReactNode } from 'react';
import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

import Header from '../components/Header'


export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Header type='admin'/>
      <Box p="4">
        {children}
      </Box>
    </Box>
  );
}



