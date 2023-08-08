import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/posts`
        );

        const result = await response.json();
        setPosts(result.data.posts);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPosts();
  }, []);
  return (
    <>
      <div className="Posts">
        {posts.map((posts) => {
          return (
            <>
              <Container key={posts.id}>
                {posts._id} <br />
                {posts.author_id} <br />
                {posts.author.username} <br />
                {posts.title} <br />
                {posts.description} <br />
                {posts.location} <br />
                {posts.price} <br />
                {posts.createdAt} <br />
                {posts.updatedAt} <br />

                {posts.__V} <br />
                {posts.isAuthor} <br />
                {posts.active} <br />
                {posts.message} <br />
                {posts.willDeliver} <br />
              </Container>
            </>
          );
        })}
      </div>
    </>
  );
}
