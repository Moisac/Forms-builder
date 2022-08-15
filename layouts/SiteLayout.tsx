import { Box, useColorModeValue } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'


interface IProps {
    children: ReactElement
}

const SiteLayout = ({ children }: IProps): ReactElement => {
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <div className="pageContent">
                <Header type='site' hasSidebar={false} />
                    { children }
                <Footer />
            </div>
        </Box>
    )
}

export default SiteLayout