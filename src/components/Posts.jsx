import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

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
    <h2>New Posts Every Day</h2>
    <Button className="my-4" variant="primary"
        onClick={() => {
          navigate("/createposts");
        }}
      >
        Create New Post
      </Button>
      <div className="Posts">
        <Container className="d-flex justify-content-between align-items">
          <Row>
            {posts.map((posts) => {
              return (
                <>
                  <Col md={6} key={posts.id}>
                    <ListGroup as="ul">
                      <ListGroup.Item variant="light" as="li" active className="d-flex justify-content-between align-items-center">
                        {posts.title}
                        <Button
                          variant="dark"
                          onClick={() => {
                            navigate("/singleposts");
                          }}
                        >
                          View
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item variant="dark" as="li">
                        {posts.description}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  {/* {posts._id} <br /> 
                {posts.createdAt} <br />
                 {posts.location} {posts.price}
                {posts.updatedAt} <br />
                {posts.__V} <br />
                {posts.isAuthor} <br />
                {posts.active} <br />
                {posts.message} <br />
                {posts.willDeliver} <br /> */}
                </>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
}
