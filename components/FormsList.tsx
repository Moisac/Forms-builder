import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Skeleton, Text, useClipboard, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FiEdit2, FiMoreVertical } from 'react-icons/fi'
import { getApiData } from '../utils/services'
import { TbCopy } from 'react-icons/tb' 

const FormsList = () => {
    const [forms, setForms] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedForm, setSelectedForm] = useState('')

    const toast = useToast()
    const { onCopy } = useClipboard(`${process.env.NEXT_PUBLIC_ROOT_URL}/form/${selectedForm}`)

    const getForms = async() => {
        const data = await getApiData(
            'api/form',
            'GET',
            setIsLoaded,
        )

        setForms(data)
    }

    useEffect(() => {
        getForms()
    }, [])

    const handleCopyUrl = () => {
        onCopy()
        toast({
            title: 'URL was successfully copied',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top'
        })
    }

  return (
    <>
        { isLoaded ? 
        forms?.map(form => (
            <Flex 
                justifyContent='space-between' 
                bg='white' 
                shadow='xs' 
                p='4' 
                mb='5'
                borderRadius='10' 
                cursor='pointer'
                _hover={{ shadow: 'md' }} 
                key={form?.id}
            >
                <Box>
                    <Link href={`/admin/create-form/${form?.id}`} key={form?.id}>
                        <Text>{ form?.title }</Text>
                    </Link>
                </Box>
                <Box>
                    <Text>{ form?.updated_at }</Text>
                </Box>
                <Box>
                    <Text>{ form?.published ? 'Active' : 'Disabled' }</Text>
                </Box>
                <Box display='flex' justifyContent='space-between' gap='10px'>
                    <Link href={`/admin/create-form/${form?.id}`}>
                        <FiEdit2 />
                    </Link>
                    <Menu>
                        <MenuButton 
                            onClick={() => setSelectedForm(form?.id)}
                        >
                            <FiMoreVertical />
                        </MenuButton>
                            <MenuList>
                                <MenuItem onClick={handleCopyUrl} >
                                <TbCopy /> Copy link
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>
        )) 
        :
        ( <>
            <Flex 
                justifyContent='space-between' 
                bg='white' 
                shadow='xs' 
                p='4' 
                mb='5'
                borderRadius='10' 
                gap='50'
            >
                <Skeleton
                    height='25px'
                    isLoaded={isLoaded}
                    fadeDuration={4}
                    flex='1'
                />
                <Skeleton
                    height='25px'
                    isLoaded={isLoaded}
                    fadeDuration={4}
                    flex='1'
                />
                <Skeleton
                    height='25px'
                    isLoaded={isLoaded}
                    fadeDuration={4}
                    flex='1'
                />
                <Skeleton
                    height='25px'
                    isLoaded={isLoaded}
                    fadeDuration={4}
                    flex='1'
                />
            </Flex>
            <Flex 
                    justifyContent='space-between' 
                    bg='white' 
                    shadow='xs' 
                    p='4' 
                    mb='5'
                    borderRadius='10'
                    gap='50' 
                >
                    <Skeleton
                        height='25px'
                        isLoaded={isLoaded}
                        fadeDuration={4}
                        flex='1'
                    />
                    <Skeleton
                        height='25px'
                        isLoaded={isLoaded}
                        fadeDuration={4}
                        flex='1'
                    />
                    <Skeleton
                        height='25px'
                        isLoaded={isLoaded}
                        fadeDuration={4}
                        flex='1'
                    />
                    <Skeleton
                        height='25px'
                        isLoaded={isLoaded}
                        fadeDuration={4}
                        flex='1'
                    />
            </Flex>
            <Flex 
                justifyContent='space-between' 
                bg='white' 
                shadow='xs' 
                mb='5'
                p='4' 
                borderRadius='10' 
                gap='50'
            >
                <Skeleton
                    height='25px'
                    isLoaded={isLoaded}
                    fadeDuration={4}
                    flex='1'
                />
                <Skeleton
                    height='25px'
                    isLoaded={isLoaded}
                    fadeDuration={4}
                    flex='1'
                />
                <Skeleton
                    height='25px'
                    isLoaded={isLoaded}
                    fadeDuration={4}
                    flex='1'
                />
                <Skeleton
                    height='25px'
                    isLoaded={isLoaded}
                    fadeDuration={4}
                    flex='1'
                />
            </Flex>
        </>
        )
        }
    </>
  )
}

export default FormsList