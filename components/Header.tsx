import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Skeleton,
  useColorModeValue,
  HStack,
  Avatar,
  VStack,
  SkeletonCircle,
  IconButton,
  Spinner
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { FiChevronDown, FiMenu } from "react-icons/fi"
import { BsClipboardPlus } from "react-icons/bs"
import Router, { useRouter } from "next/router"
import { getApiData } from "../utils/services"

interface IProps {
    type: 'site' | 'admin',
}

const Header = ({ type }: IProps) => {
    // const [createdForm, setCreatedForm] = useState({})
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());
    const session = useSession()
    const router = useRouter()

    const createForm = async() => {
        const addedForm = {
            title: "Default form title",
            questions: "",
            settings: "",
            userId: "cl6t9t9re0318jwubdzps0r01"
        }
        await getApiData(
            'api/form',
            'POST',
            setLoading,
            addedForm
        )
    }

    const handleLogout = () => {
        signOut()
    }

    const handleAddFrom = async () => {
        const createdForm = await createForm()
        console.log({createdForm})
        if(!!createdForm?.id) {
            router.push(`/admin/create-form/${createdForm?.id}`)
        }
    }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
    >
       { type === 'site' && 
         <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={handleToggle}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
        />
       }
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Forms builder
        </Heading>
      </Flex>

      {
        type === 'site' &&
        (
            <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "block" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
                mt={{ base: 4, md: 0 }}
            >
                <Text>Docs</Text>
                <Text>Examples</Text>
                <Text>Blog</Text>
            </Stack>
        )
      }

        { session.status === 'unauthenticated' ? 
            (
                <Box
                    display={{ base: isOpen ? "block" : "none", md: "block" }}
                    mt={{ base: 4, md: 0 }}
                >   
                <Stack spacing={4} direction='row' align='center'>
                    <Link href='/auth/signup'>
                        <Button
                            variant="outline"
                            _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                        >
                            Create account
                        </Button>
                    </Link>
                    <Link href='/auth/signin'>
                        <Button
                            variant="outline"
                            _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                        >
                            Login
                        </Button>
                    </Link>
                    </Stack>
            </Box>
            )
            :
            session.status === 'authenticated' ?
            (
                <Flex alignItems={'center'}>
                   { type === 'admin' && 

                        <Button 
                            leftIcon={<BsClipboardPlus />} 
                            colorScheme='blue' 
                            variant='outline' 
                            mr='4'
                            onClick={handleAddFrom}
                        >
                            { loading ? <Spinner size='sm' /> : 'Create Form'}
                        </Button>
                    
                   }
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}>
                        <HStack>
                            <Avatar
                                size={'sm'}
                            />
                            <VStack
                                display={{ base: 'none', md: 'flex' }}
                                alignItems="flex-start"
                                spacing="1px"
                                ml="2"
                            >
                                <Text fontSize="sm">{ session?.data?.user?.email }</Text>
                            </VStack>
                            <Box display={{ base: 'none', md: 'flex' }}>
                                <FiChevronDown />
                            </Box>
                        </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuGroup>
                                {  type === 'site' ?
                                    (
                                        <Link href='/admin'>
                                        <MenuItem>Admin</MenuItem>
                                    </Link>
                                    )
                                    :
                                    (
                                        <>
                                            <Link href='/admin'>
                                                <MenuItem>Forms list</MenuItem>
                                            </Link>
                                            <Link href='admin/create-form'>
                                                <MenuItem>Create form</MenuItem>
                                            </Link>
                                        </>
                                    )
                                }
                                
                                <MenuDivider />
                                <MenuItem onClick={handleLogout}>Logout </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </Flex>
            )
            :
            (
                <Box
                    display={{ base: isOpen ? "block" : "none", md: "block" }}
                    mt={{ base: 4, md: 0 }}
                >   
                    <Flex align="center" gap={3}>
                        <SkeletonCircle size='10' />
                        <Skeleton height='20px' width={200}/>
                    </Flex>
                </Box>
            )
        }
    </Flex>
  );
};

export default Header;