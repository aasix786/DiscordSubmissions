import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import '../App.css';
import { DELETE_SUBMISSION, GET_SUBMISSION, POST_SUBMISSION, UPDATE_SUBMISSION } from '../Services/services';

function Dashboard () {
  const [userData, setUserData] = useState(null);
  const [description, setDescription] = useState(null);
  const [submissionsArr, setSubmissionsArr] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
 
  useEffect(() => {
  let userDetails = localStorage.getItem("userData")
  if(userDetails){
    userDetails = JSON.parse(userDetails)
  setUserData(userDetails)
console.log(userDetails)
getSubmission()
  }
  }, []);
const postSubmission = () => {
  let body = {
    "description":description
  }
POST_SUBMISSION(body)
  .then(({ data }) => {
    console.log("POST_SUBMISSION RESPONSE =>" , data)
   setDescription("")
   getSubmission()
  })
  .catch(function (error) {
    alert('Error!', error?.response?.data?.message)
   })
}
const updateSubmission = () => {
  let body = {
    "description":description
  }
UPDATE_SUBMISSION(body,currentItem)
  .then(({ data }) => {
    console.log("UPDATE_SUBMISSION RESPONSE =>" , data)
   setCurrentItem("")
   setDescription("")
   getSubmission()
  })
  .catch(function (error) {
    alert('Error!', error?.response?.data?.message)
   })
}
const getSubmission = () => {
  
GET_SUBMISSION()
  .then(({ data }) => {
    console.log("GET_SUBMISSION RESPONSE =>" , data)
   setSubmissionsArr(data.data)
  })
  .catch(function (error) {
    alert('Error!', error?.response?.data?.message)
   })
}
const editDescription = (data) => {
setDescription(data.description)
setCurrentItem(data._id)
}
const deleteDescription = (data) => {
  DELETE_SUBMISSION(data._id)
  .then(({ data }) => {
    console.log("DELETE_SUBMISSION RESPONSE =>" , data)
   getSubmission()
  })
  .catch(function (error) {
    alert('Error!', error?.response?.data?.message)
   })
  }
  return(
    <>
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/me">Dashboard</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login">{userData?.username}</a>
        </Navbar.Text>
        <Button onClick={() => {
          localStorage.clear();
          window.location.assign("/");
        }} style={{
                  marginLeft:10,
  
        }} variant="danger">Logout</Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
  
  <div>

  </div>
  
  
  <div>
    <h3>Submissions</h3>
    <div style={{ border: '1px solid black'}}>
  {submissionsArr.length < 10 && 
   <form >
   <label> Description</label>
   <br />
   <input  style={{margin:10}}
     name='choreDesc' 
     type='text'
     value={description}
     onChange={(event) => setDescription(event.target.value)}
   />
   <br/>
   
   <input style={{margin:10}}
     className='submitButton'
     type='button' 
     value='Submit' 
     onClick={()=> currentItem ? updateSubmission() : postSubmission()}
   />
 </form>
  }
   
      </div>
  
  </div>
  
  <div>
  <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submissionsArr.length > 0 ? submissionsArr.map((item, index) => {
            return(
              <tr key={index}>
              <td>{index+1}</td>
              <td>{item.description}</td>
              <td>  
                <Button onClick={() => editDescription(item)} type='button' size="sm" variant="outline-warning">Edit</Button>
                <Button style={{marginLeft:10}} onClick={() => deleteDescription(item)} type='button' size="sm" variant="outline-danger">Delete</Button>
                </td>
    
            </tr>
            )
          }) : null}
        
         
        </tbody>
      </Table>
  </div>
  </>
  )
 

      }

export default Dashboard;
