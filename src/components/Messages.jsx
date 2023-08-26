import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/posts`
        );

        const result = await response.json();

        let allposts = result.data.posts;
        //filter post my username
        let Myposts = allposts.filter(
          (post) => post.author.username === username
        );

        console.log(Myposts);

        setPosts(Myposts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPosts();
  }, []);
  return (
    <>
      <h2>My Messages</h2>
      <div className="Posts">
        <Container className="d-flex justify-content-between align-items">
          <Row>
            {posts.map((posts) => {
              return (
                <>
                  <Col md={12} className="mb-3" key={posts._id}>
                    <ListGroup as="ul">
                      <ListGroup.Item
                        variant="light"
                        as="li"
                        active
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="fw-bold ms-2 me-auto"> {posts.title}</div>

                        <Badge bg="primary" pill>
                          {posts.messages.length}
                        </Badge>

                        <Button
                          variant="light"
                          onClick={() => {
                            localStorage.setItem("post", JSON.stringify(posts));
                            navigate(`/post/${posts._id}`);
                          }}
                        >
                          View
                        </Button>
                      </ListGroup.Item>
                      <ListGroup.Item variant="secondary" as="li">
                        {posts.description}
                      </ListGroup.Item>
                      <ListGroup.Item variant="secondary" as="li">
                        Location: {posts.location}
                      </ListGroup.Item>
                      <ListGroup.Item variant="secondary" as="li">
                        Price: {posts.price}
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
