import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Posts from "./Posts";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const username = localStorage.getItem("username");
  const[numerMessages, setNumerMessages] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
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

        let allposts = result.data.posts;
        //filter post my username
        console.log(result.data.posts);
        let Myposts = allposts.filter(
          (post) => post.author.username === username
        );

        setPosts(Myposts);
        console.log(Myposts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPosts();
  }, [username]);
  return (
    <>
      <h2>My posts</h2>
      <div className="Posts">
        <Container className="d-flex justify-content-between align-items">
          <Row>
            {posts.map((post) => {
              
              return (
                <>
                  <Col md={12} className="mb-3" key={post._id}>
                    <ListGroup as="ul">
                      <ListGroup.Item
                        variant="light"
                        as="li"
                        active
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="fw-bold ms-2 me-auto"> {post.title}</div>

                        <Badge bg="primary" pill>
                          {post.messages.length}
                        </Badge>
                        

                        <Button
                          variant="light"
                          onClick={() => {
                            localStorage.setItem("post", JSON.stringify(post));
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
