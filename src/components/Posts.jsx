import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState( localStorage.getItem('token'));
  const [search, setSearch] = useState("");

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
      <Form>
        <InputGroup bg="dark" data-bs-theme="dark" className="mb-3">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts"
          />
        </InputGroup>
      </Form>
      <div className="Posts">
        <Container className="d-flex justify-content-between align-items">
          <Row>
          {posts
              .filter((posts) => {
                return search.toLowerCase() === ""
                  ? posts
                  : posts.title.toLowerCase().includes(search) || posts.description.toLowerCase().includes(search) ||
                  posts.price.toLowerCase().includes(search) ;
              })
              .map((post) => {
                return (
                <>
                  <Col md={12} className="mb-3" key={post._id}>
                    <ListGroup as="ul">
                      <ListGroup.Item
                        variant="primary"
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
                </>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
}
