import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom"; 

export default function EditPosts({showMessage}) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [location, setLocation] = useState();
  const [token, setToken] = useState( localStorage.getItem('token'));
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const [willDeliver, setWillDeliver] = useState(false);
  const [singlePost, setSinglePost] = useState(
    JSON.parse(localStorage.getItem("post"))
  );


  useEffect(() => {
    async function fetchPosts() {
      try {
        setTitle(singlePost.title);
        setDescription(singlePost.description);
        setPrice(singlePost.price);
        setLocation(singlePost.location);
        setToken(localStorage.getItem('token'));
        setWillDeliver(singlePost.willDeliver);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPosts();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/posts/${singlePost._id}`,
        {
          method: "PATCH",
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

      if(result.error){
        showMessage(result.error.message,'danger');
      }else if(result.success){
        navigate("/posts");
        showMessage(" " + title +" Updated " ,'Success');
      }
      console.log(result);
    } catch (error) {
      showMessage(error.message,'danger');
      setError(error.message);
    }
  }
  return (
    <>
      <h2>Update Post!</h2>
      <Form onSubmit={handleSubmit}>
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
         
        </Row>
        <Form.Check 
            type='checkbox'
            id='deliver'
            label='Willing to Deliver?'
            checked={willDeliver}
            onChange={()=>{
              setWillDeliver(!willDeliver);
            }}
          />
        <Button variant="primary" type="submit">
          Update
        </Button>
        <Button
          variant="dark"
          onClick={() => {
            navigate("/post/:id");
          }}
        >
          Back
        </Button>
      </Form>
    </>
  );
}
