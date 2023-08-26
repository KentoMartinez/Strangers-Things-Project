import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function SinglePosts({ showMessage }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singlePost, setSinglePost] = useState(
    JSON.parse(localStorage.getItem("post"))
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");
  const [message, setMessage] = useState("");

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
      showMessage(result.error.message,'danger');
    } catch (error) {
      console.error(error);
    }
  };

  async function sendMessage(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/posts/${singlePost._id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: {
              content: message,
            },
          }),
        }
      );
      const result = await response.json();

      if (result.error) {
        showMessage(result.error.message, "danger");
      } else if (result.success) {
        navigate("/posts");
        showMessage(" Message sent ", "Success");
      }
      console.log(result);
    } catch (error) {
      showMessage(error.message, "danger");
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Post</h2>
      <Button
        variant="dark"
        onClick={() => {
          navigate("/posts");
        }}
      >
        Back{" "}
      </Button>
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

                {singlePost.author.username === username ? (
                  <>
                    <Button
                      variant="light"
                      onClick={() => {
                        navigate("/editpost");
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={handleDelete}
                      id="delete-button"
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </ListGroup.Item>
              <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                {singlePost.author.username}
              </ListGroup.Item>
              <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">{singlePost._id}</ListGroup.Item>
              <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">{singlePost.description}</ListGroup.Item>
              <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">{singlePost.location}</ListGroup.Item>
              <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">{singlePost.price}</ListGroup.Item>
              
              {singlePost.messages.length>0?
              <ListGroup.Item as="li" variant="primary" className="d-flex justify-content-center "><div className="fw-bold">Messages</div></ListGroup.Item>:
              <></>
              }
              {singlePost.messages.length > 0 ? (
                
                singlePost.messages.map((message) => {
                  return (
                    <>
                    
                      <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" variant="info">
                        
                          <div className="fw-bold"> from User: {message.fromUser.username}</div>
                          
                          
                       
                      </ListGroup.Item>
                      <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">{message.content}</ListGroup.Item>
                     
                    </>
                  );
                })
                
              ) : (
                <>
                  <ListGroup.Item as="li" variant="primary" className="d-flex justify-content-center "><div className="fw-bold">No Messages</div></ListGroup.Item>
                </>
              )}
            </ListGroup>
          </Col>{
            singlePost.author.username === username?
          <Form onSubmit={sendMessage}>
            <Form.Group className="mb-3" controlId="Message">
              <Form.Label>Send a Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Send
              </Button>
            </Form.Group>
          </Form>:
          <>
          </>
          }
        </Row>
      )}
    </>
  );
}
