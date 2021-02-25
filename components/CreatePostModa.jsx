import { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  FormControl,
  FormLabel,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Input,
  useToast,
} from '@chakra-ui/react';

import { useMutation, useQueryClient } from 'react-query';

const CreatePostModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();
  const toast = useToast();

  const createPost = useMutation(
    (post) => {
      return fetch('http://localhost:3000/api/post', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries('posts');
        toast({
          title: 'Post creado 🎉',
          status: 'success',
          duration: 1000,
          isClosable: true,
          position: 'top',
        });
      },
    }
  );

  const handlerCreatePost = () => {
    createPost.mutate({ title, description });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Titulooooooo</FormLabel>
              <Input
                placeholder="tituloooo....."
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <Input
                placeholder="Descripción....."
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handlerCreatePost}>
              crear Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostModal;
