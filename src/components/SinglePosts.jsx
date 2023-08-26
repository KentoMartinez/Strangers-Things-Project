import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SinglePosts({ showMessage }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singlePost, setSinglePost] = useState(
    JSON.parse(localStorage.getItem("post"))
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchSinglePost() {
      try {
        console.log(token);
        console.log(singlePost);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchSinglePost();
  }, []);
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2>Post</h2>
      {singlePost && (
        <Row>
          <Col md={12} key={singlePost._id}>
            <ListGroup as="ul">
              <ListGroup.Item
                variant="success"
                as="li"
                active
                className="d-flex justify-content-between align-items-center"
              >
                {singlePost.title}
                <Button
                  variant="light"
                  onClick={() => {
                    navigate("/editpost");
                  }}
                >
                  Edit
                </Button>
              </ListGroup.Item>
              <ListGroup.Item as="li">
              {singlePost.author.username}
              </ListGroup.Item>
              <ListGroup.Item as="li">{singlePost._id}</ListGroup.Item>
              <ListGroup.Item as="li">{singlePost.description}</ListGroup.Item>
              <ListGroup.Item as="li">{singlePost.location}</ListGroup.Item>
              <ListGroup.Item as="li">{singlePost.price}</ListGroup.Item>
              <ListGroup.Item as="li">{singlePost.message}</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
      <Button variant="danger" onClick={handleDelete} id="delete-button">
        Delete
      </Button>
      <Button
        variant="dark"
        onClick={() => {
          navigate("/posts");
        }}
      >
        Back{" "}
      </Button>
    </>
  );
}
