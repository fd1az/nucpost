import { Box, Button, Text } from '@chakra-ui/react';

const Post = ({ post }) => {
  return (
    <Box
      w="100%"
      bg="gray.100"
      height="100vh"
      display="flex"
      justifyContent="center"
    >
      <Box
        maxH="400px"
        py={16}
        w="500px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        m={5}
      >
        <Box p="6" display="flex" flexDirection="column">
          <Text as="h1" fontSize="25px" fontWeight="600" textAlign="center">
            {post?.title}
          </Text>
          <Text textAlign="center" py="10">
            {post?.description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export async function getStaticPaths() {
  const results = await fetch('http://localhost:3000/api/post');
  const { data } = await results.json();

  const paths =
    data?.map((post) => ({
      params: {
        id: post._id,
      },
    })) || [];

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/post/${params.id}`);
  const { data } = await res.json();
  return {
    props: {
      post: data[0],
    },
  };
}

export default Post;
