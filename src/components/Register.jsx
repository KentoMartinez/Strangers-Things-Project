import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

export default function Register({showMessage}) {
  const [token, setToken] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();


    try {
        console.log(username);
        console.log(password);
      const response = await fetch(
        "https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username:  username ,
              password:  password ,
            },
          }),
        }
      );
      const result = await response.json();

      //setToken(result.token);
      console.log(result);
      if(result.error){
        showMessage(result.error.message,'danger');
      }else{
        showMessage("random message",'succes');
      }
      
    } catch (error) {
     
      setError(error.message);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p>{error}</p>}
        <Form.Group className="mb-3" controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <br/>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              aria-describedby="inputGroupPrepend"
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <br></br>
          <Form.Control
            type="password"
            placeholder="Password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br/>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
