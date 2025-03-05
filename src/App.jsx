import { Typography, Pagination, Stack, Box, Container } from '@mui/material'
import './App.css'
import { blue, pink, red } from '@mui/material/colors'
import { useState } from 'react'
import { useEffect } from 'react';


function App() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
const fetchPosts = async ({limit = 3}) => {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
  const response = await fetch(url);
  if(!response.ok){
    throw new Error("Failed to fetch data")
  };
  const data = await response.json();
  if(data.length > 0){
    setPosts(data)
  }
}
useEffect(() => {
fetchPosts({limit:3})
},[page]);
const handleChange = (event, value) => {
  setPage(value);
};


  return (
    <Container maxWidth="sm">
    <Typography variant='h4' sx={{marginBottom: 2, color: blue[200]}}>Posts on page : {page}</Typography>
    <Box sx={{height: '100vh'}} >
    <Stack spacing={7} sx={{ textAlign: 'center' }}>
    {posts.length > 0 ? (
        posts.map((post, index) => (
          <Box key={index} sx={{borderColor:pink[500], borderWidth: 2 , borderStyle: 'solid', padding: 2}} >
            <Typography variant='caption'>{post.title}</Typography>
            <Typography variant='h6'>{post.body}</Typography>
          </Box>
        ))
      ) : (
        <p>No posts available.</p>
      )}
      <Pagination count={20} page={page} onChange={handleChange} color="secondary" shape="rounded" showFirstButton showLastButton  />
    </Stack>
    </Box>
    </Container>
  )
}

export default App
