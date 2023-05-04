
import { useEffect,useState } from 'react';
import { DiscordLoginButton } from "react-social-login-buttons";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { SIGNIN, SIGNUP } from '../Services/services';
const CLIENT_ID ="1103308111130935356"
const CLIENT_SECRET ="YROAptXtcLDRozrNMc9WfkIX9FGB71pp"
const REDIRECT_URI ="http://localhost:3000/"
const SCOPE ="email"

function LoginPage() {
  const location = useLocation();
  const [username, setUsername] = useState('');

  useEffect(() => {
    let params = window.location.href.replace(/#/g, '');
    if(params.includes("access_token")){
      var accessToken = params.split("&")
      .find(item => item.startsWith("access_token="))
      .split("=")[1];
  
  console.log("access_token:", accessToken);
      console.log(">>>>>>>>>>>>>>>")
      console.log("CLIENT_ID =>",CLIENT_ID)
      console.log("CLIENT_SECRET =>",CLIENT_SECRET)
      console.log("accessToken =>",accessToken)
      console.log("REDIRECT_URI =>",REDIRECT_URI)
      console.log("SCOPE =>",SCOPE)
      console.log(">>>>>>>>>>>>>>>")
      if (accessToken) {
        axios.get("https://discord.com/api/users/@me", {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then((response) => {
            const discordDATA = response.data;
            console.log("discordDATA =>",discordDATA.email)
            let body = {
              "email": response.data.email ? response.data.email : response.data.username
          }
            SIGNIN(body)
            .then(({ data }) => {
              console.log("LOGIN RESPONSE =>" , data)
              let USER_ID = data.result.user._id;
              discordDATA.userID = USER_ID
        localStorage.setItem("userData",JSON.stringify(discordDATA))
        localStorage.setItem("token",data.result.token)
        window.location.assign("/me");
            })
            .catch(function (error) {
              alert('Error!', error?.response?.data?.message)
              if(error?.response?.data?.message){
                if(error?.response?.data?.message == "Email is not registered with any account"){
                  var rand = Math.floor(Math.random() * 999999) + 1 ;
                  let body = {
                    "email": discordDATA.email ? discordDATA.email : discordDATA.username,
                    "password":rand,
                    "firstName":discordDATA.username,
                    "lastName":""
                }
                  SIGNUP(body)
                  .then(({ data }) => {
                  let USER_ID = data.result.user._id;
                  discordDATA.userID = USER_ID
            localStorage.setItem("userData",JSON.stringify(discordDATA))
            localStorage.setItem("token",data.result.token)
            window.location.assign("/me");
                  })
                  .catch(function (error) {
                    alert('Error!', error?.response?.data?.message)
                   
                   })
                }
              }
             })

          })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  
  }, [location]);
  const handleDiscordLogin = async () => {
  
    const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURI(REDIRECT_URI)}&response_type=token&scope=email`;
    window.location.replace(url);
  };



  return (
    <>
    


    <div>
      <h1>Login 
      </h1>
      <DiscordLoginButton onClick={handleDiscordLogin} />
    </div>

    </>
   
 
  );
}


export default LoginPage;

