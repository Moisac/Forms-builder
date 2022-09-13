import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Skeleton, Text, useClipboard, useDisclosure, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FiEdit2, FiMoreVertical } from 'react-icons/fi'
import { getApiData } from '../utils/services'
import { TbCopy } from 'react-icons/tb' 
import { AiOutlineDelete } from 'react-icons/ai'

const FormsList = () => {
    const [forms, setForms] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedForm, setSelectedForm] = useState('')

    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete} = useDisclosure()
    const cancelRef = useRef()

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

    const deleteForm = async() => {
        const data = await getApiData(
            `api/form/${selectedForm}`,
            'DELETE',
            setIsLoaded,
        )

        if(!!data?.id) {
            onCloseDelete()
            toast({
              title: 'Form was successfully deleted',
              status: 'success',
              duration: 4000,
              isClosable: true,
              position: 'top'
            })
            getForms()
          }
    }

    useEffect(() => {
        getForms()
    }, [])

    const handleCopyUrl = () => {
        onCopy()
        toast({
            title: 'Link was successfully copied',
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
                    <Link href={`/admin/form/${form?.id}/create`} key={form?.id}>
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
                    <Link href={`/admin/form/${form?.id}/create`}>
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
                                <MenuItem onClick={onOpenDelete} >
                                    <AiOutlineDelete /> Delete form
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

        <AlertDialog
            isOpen={isOpenDelete}
            leastDestructiveRef={cancelRef}
            onClose={onCloseDelete}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete form
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure you want to delete this form?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onCloseDelete}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' ml={3} onClick={deleteForm}>
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    </>
  )
}

export default FormsList