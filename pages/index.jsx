import { Box, Flex } from '@chakra-ui/react';
import Post from '../components/Post';
import { connectDB } from '../db/connection';
import { getPosts } from '../db/post';
import { useQuery } from 'react-query';

export default function Home({ posts }) {
  const { data } = useQuery(
    'posts',
    () => fetch('http://localhost:3000/api/post').then((data) => data.json()),
    { initialData: { data: posts } }
  );
  console.log(data);
  return (
    <Box bg="gray.100" minH="100vh" py={16}>
      <Flex
        as="main"
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="column"
        margin="10 auto"
      >
        {data?.data?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps(context) {
  const { db } = await connectDB();
  const posts = await getPosts(db);
  console.log(posts);
  return {
    props: {
      posts,
    },
  };
}
