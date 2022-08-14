import React from "react";
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
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

interface IProps {
    type: 'site' | 'admin'
}

const Header = ({ type}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const session = useSession()

    const handleLogout = () => {
        signOut()
    }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Forms builder
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <GiHamburgerMenu />
      </Box>

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
                <Box
                    display={{ base: isOpen ? "block" : "none", md: "block" }}
                    mt={{ base: 4, md: 0 }}
                >
                <Menu>
                    <MenuButton as={Button} colorScheme='blue'>
                        { session?.data?.user?.email }
                    </MenuButton>
                    <MenuList color='black'>
                        { type === 'site' ?
                        (
                            <MenuGroup>
                                <Link href='/admin'>
                                    <MenuItem>Admin</MenuItem>
                                </Link>
                                <MenuDivider />
                                <MenuItem onClick={handleLogout}>Logout </MenuItem>
                            </MenuGroup>
                        )
                        :
                        (
                            <MenuGroup>
                                <Link href='/admin'>
                                    <MenuItem>Forms list</MenuItem>
                                </Link>
                                <Link href='/create-form'>
                                    <MenuItem>Create form</MenuItem>
                                </Link>
                                <MenuDivider />
                                <MenuItem onClick={handleLogout}>Logout </MenuItem>
                            </MenuGroup>
                        )
                        }
                    </MenuList>
                </Menu>
            </Box>
            )
            :
            (
                <Box
                    display={{ base: isOpen ? "block" : "none", md: "block" }}
                    mt={{ base: 4, md: 0 }}
                >
                    <Skeleton height='30px' width={200}/>
                </Box>
                
            
            )
        }
    </Flex>
  );
};

export default Header;