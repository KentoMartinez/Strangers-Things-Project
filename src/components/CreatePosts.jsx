import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom"; 

export default function CreatePosts({showMessage}) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [location, setLocation] = useState();
  const [token, setToken] = useState( localStorage.getItem('token'));
  const [error, setError] = useState(null);
  const [willDeliver, setWillDeliver] = useState(false);
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
              willDeliver : willDeliver
            },
          }),
        }
      );
      const result = await response.json();

      if(result.error){
        showMessage(result.error.message,'danger');
      }else if(result.success){
        localStorage.setItem('token', result.data.token);
        setToken(result.data.token);
        navigate("/posts");
        showMessage(" " + title +" Created " ,'Success');
      }
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <h2>Create Post!</h2>
      
      <Form onSubmit={handleSubmit}>
        
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
