import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SinglePosts({showMessage ,token ,setToken}){
   const { id } = useParams
   const navigate = useNavigate();
   const [singlepost, setSinglePosts] = useState();
   useEffect(() => {
      async function fetchSinglePosts() {
         try {
            const response = await fetch(
               `https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/posts/${id}`
            );
            const result = await response.json();
            setSinglePosts(result.post._id);
         } catch (error) {
            console.error(error)
         }
      }
      fetchSinglePosts();
   }, [id]);
   const handleDelete = async () => {
      try {
         const response = await fetch(
           `https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/posts/${id}`,
           {
             method: "DELETE",
           }
         );
         const result = await response.json();
         console.log(result);
       } catch (error) {
         console.error(error);
       }
     };
   return(
      <>
      <h1>hello</h1>
     <Row>
      <Col md={6} key={singlepost.id}>
                    <ListGroup as="ul">
                      <ListGroup.Item variant="success" as="li" active className="d-flex justify-content-between align-items-center">
                        {singlepost.title}
                        </ListGroup.Item>
                      <ListGroup.Item as="li">{singlepost.author_id}</ListGroup.Item>
                      <ListGroup.Item as="li">
                        {singlepost.description}
                      </ListGroup.Item>
                      <ListGroup.Item as="li">{singlepost.location}</ListGroup.Item>
                      <ListGroup.Item as="li">{singlepost.price}</ListGroup.Item>
                    </ListGroup>
                  </Col>
      </Row>
      <Button
        variant="danger"
        onClick={handleDelete}
        id="delete-button"
      >
        Delete
      </Button>
      <Button
        variant="dark"
        onClick={() => {
          navigate("/posts");
        }}
      >
        Back
      </Button>
      </>
   );
}