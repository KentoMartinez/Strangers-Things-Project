import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState( localStorage.getItem('token'));


  useEffect(() => {
    async function fetchPosts() {
      console.log(token);
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/posts`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          }
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
      <div className="Posts">
        <Container className="d-flex justify-content-between align-items">
          <Row>
            {posts.map((post) => {
              return (
                <>
                  <Col md={12} className="mb-3" key={post._id}>
                    <ListGroup as="ul">
                      <ListGroup.Item
                        variant="success"
                        as="li"
                        active
                        className="d-flex justify-content-between align-items-center"
                      >
                        {post.title}
                        
                        <Button
                          variant="light"
                          onClick={() => {
                            localStorage.setItem("post",JSON.stringify(post));
                            navigate(`/post/${post._id}`);
                          }}
                        >
                          View
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item variant="secondary" as="li">
                        {post.description}
                      </ListGroup.Item>
                      <ListGroup.Item variant="secondary" as="li">
                        Location: {post.location}
                      </ListGroup.Item>
                      <ListGroup.Item variant="secondary" as="li">
                        Price: {post.price}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>

                  {/* {posts._id} <br /> 
                {posts.createdAt} <br />
                
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
