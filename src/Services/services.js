
import axios from 'axios';
const URL = "http://mern-api-kira.herokuapp.com/";

// .............AUTHENTICATION.........
export const SIGNIN = async (body) => {
    return axios.post(`${URL}auth/social`, body)
  };
  
  export const SIGNUP = async (body) => {
    return axios.post(`${URL}auth/signup`, body)
  };
  export const POST_SUBMISSION = async (body) => {
    let accessToken = localStorage.getItem("token")
    console.log(accessToken)
    return axios.post(`${URL}submissions/`, body,{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })
  };
  export const UPDATE_SUBMISSION = async (body,id) => {
    let accessToken = localStorage.getItem("token")
    console.log(accessToken)
    return axios.put(`${URL}submissions/${id}`, body,{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })
  };
  export const DELETE_SUBMISSION = async (id) => {
    let accessToken = localStorage.getItem("token")
    console.log(accessToken)
    return axios.delete(`${URL}submissions/${id}`,{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })
  };
  export const GET_SUBMISSION = async () => {
    let accessToken = localStorage.getItem("token")
    console.log(accessToken)
    return axios.get(`${URL}submissions?limit=10&skip=0`,{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })
  };
  