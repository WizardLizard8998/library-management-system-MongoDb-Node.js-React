import React from  "react"; 
import{ useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./Pages.css";
import { AccountContext } from "../DATA/Accountdata";
import { useHistory } from "react-router-dom";
import axios from "axios";

function MainPage() {
  const [email, setEmail1] = useState("");
  const [password, setPassword1] = useState("");
  const [name, setName1] = useState("");


  const [loginemail, setloginEmail] = useState("");
  const [loginpassword, setloginPassword] = useState("");
  

  const [registeremail, setregisterEmail] = useState("");
  const [registerpassword, setregisterPassword] = useState("");
  const [registername, setregisterName] = useState("");

  const {
    Name,
    Email,
    Password,
    Id,
    Date,
    setName,
    setPassword,
    setEmail,
    setId,
    setDate,
  } = useContext(AccountContext);

  let finres;
  const history = useHistory();

  const [data,setData] = useState([]);

  useEffect(() => {
    console.log(Id,Name,Password,Email) 
  }, [Email]);
  
  const LoginClick = async (e) => {
    
      setEmail1(loginemail);
      setPassword1(loginpassword);

      /*
   const res =  await fetch(
      `http://localhost:5000/getLogin/?email=${email}&password=${password}`
    ).then((resp) => {

    
      return resp;

    })
    .catch((e) => {
      alert(e);
    });

    finres = await res.json();

   

    console.log(finres[0])

    await setData(finres[0])
   
  

      setName(finres[0].name)
      setEmail(finres[0].email)
      setPassword(finres[0].password)
      setId(finres[0]._id)
     

 
    console.log(finres[0].name)

   
    */
   

   axios
   .get( `http://localhost:5000/getLogin/?email=${email}&password=${password}`)
   .then((resp) => {

    
      setId(resp.data[0]._id)
      setName(resp.data[0].name)
      setEmail(resp.data[0].email)
      setPassword(resp.data[0].password)
     

  })
  .catch((e) => {
    alert(e);
  });

  
    /*
      res
      .then((resp) => {

        setEmail(resp[0].email)

        alert(Id)
        setData(resp[0])
        
      })
      .catch((e) => {
        alert("couldnt log in");
      });
      */
    
      if (Id != null) {
      
       history.push("/BookPage");
       history.go();
      }
    };

 


  const RegisterClick = async (e) => {

     setEmail1(registeremail);
     setName1(registername);
     setPassword1(registerpassword);

     console.log(email,  password)

    let res = await fetch("http://localhost:5000/registerUser", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await res.json();
    console.warn(res);
    if (res) {
      alert("Registered success");
      setName1("");
      setPassword1("");
      setEmail1("");
      history.push("/BookPage");
    }
    if (!res) {
      alert("registered failed");
    }
  };

  return (
    <>
      <div class="main-page">
        <h1>Welcome to the Library Management System!!! </h1>
        <div class="user-form">
          <div class="login-form">
            <h2>User Login </h2>
            <TextField
              id="loginemail"
              label="email"
              variant="filled"
              type="email"
              value={loginemail}
              onChange={(e) => {setloginEmail(e.target.value)
                setEmail1(e.target.value)
              }}
            />
            <TextField
              id="loginpassword"
              label="password"
              variant="filled"
              type="password"
              value={loginpassword}
              onChange={(e) => {setloginPassword(e.target.value) 
                setPassword1(e.target.value)}
              }
            />
            <Button variant="outlined" onClick={LoginClick 
            
            }>
              {" "}
              Login
            </Button>
          </div>
          <div class="register-form">
            <h2>New User? Register Here!</h2>
            <TextField
              id="registername"
              label="name"
              variant="filled"
              value={registername}
              onChange={(e) => {setregisterName(e.target.value)
              setName1(e.target.value)}}
            />
            <TextField
              id="regsiteremail"
              label="email"
              variant="filled"
              type="email"
              value={registeremail}
              onChange={(e) => {setregisterEmail(e.target.value)
                setEmail1(e.target.value)
              }}
            />
            <TextField
              id="registerpassword"
              label="password"
              variant="filled"
              value={registerpassword}
              onChange={(e) => {setregisterPassword(e.target.value)
                setPassword1(e.target.value)
              }}
            />
            <Button variant="outlined" onClick={RegisterClick}>
              {" "}
              Register
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
