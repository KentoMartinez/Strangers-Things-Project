import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom"; 

export default function CreatePosts({ token }) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [location, setLocation] = useState();
  const navigate = useNavigate(); 

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            post: {
              title: title ,
              description: description ,
              price: price ,
              location: location ,
            },
          }),
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <h2>Create Post!</h2>
      <Form onClick={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" as={Col} controlId="formGridPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form>
      {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mt-5">
          <Form.Check
            inline
            label="For Delivery!"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />
            </div>
            ))}
          </Form>
        </Row>
        <Button variant="primary" onClick={handleSubmit} type="submit">
          Submit
        </Button>
        <Button
          variant="dark"
          onClick={() => {
            navigate("/posts");
          }}
        >
          Back{" "}
        </Button>
      </Form>
    </>
  );
}
