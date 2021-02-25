import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import CreatePostModal from './CreatePostModa';
import Link from 'next/link';

const Nav = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="100%" borderBottom="1px">
      <Flex
        as="nav"
        align="center"
        justifyContent="space-between"
        maxW="900px"
        m="auto"
        p={8}
      >
        <Link href="/">
          <Box
            as="button"
            bg="black"
            color="white"
            width="120px"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="50px"
            fontSize="2xl"
            fontWeight="700"
            cursor="pointer"
          >
            NucPost
          </Box>
        </Link>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Box
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            color="white"
            width="100px"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="50px"
            fontSize="100"
            fontWeight="600"
            cursor="pointer"
            onClick={onOpen}
          >
            Crear Post
          </Box>
        </motion.div>
      </Flex>
      <CreatePostModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Nav;
