import React from  "react"; 
import{ useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./Pages.css";
import { AccountContext } from "./AccountProvider";
import axios from "axios";
import {useHistory} from "react-router-dom"
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";


function MainPage() {
  const [email, setEmail1] = useState("");
  const [password, setPassword1] = useState("");
  const [name, setName1] = useState("");


  const [loginemail, setloginEmail] = useState("");
  const [loginpassword, setloginPassword] = useState("");
  

  const [registeremail, setregisterEmail] = useState("");
  const [registerpassword, setregisterPassword] = useState("");
  const [registername, setregisterName] = useState("");

  const [search,setSearch] = useState("");


  const {
    Name,
    Mail,
    Password,
    UID,
 
    setName,
    setPassword,
    setMail,
    setUID,
 
  } = useContext(AccountContext);

 
  const history =useHistory();

  const [data,setData] = useState([]);

  function DisplayBook(props) {

    const {
        index,
 
        btitle,
        bauthors,
        bedition,
        bpublisher,
        blanguage,
        bISBN,
 
    }= props; 

    console.log(index)

 

    return(
      <>
      <Paper
        sx={{
          p: 2,
          margin: "10px",
          maxWidth: 400,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6" component="div">
                  {btitle}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {"Authors: " + bauthors}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {"Edition : " + bedition + "\n"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {"Publisher: " + bpublisher + "\n"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {"Language : " + blanguage + "\n"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"ISBN :" + bISBN}
                </Typography>
              </Grid>
              <Grid item>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
    )

  }







  const LoginClick =  () => {
    
      setEmail1(loginemail);
      setPassword1(loginpassword);


      axios
      .get( `http://localhost:5000/getLogin/?email=${email}&password=${password}`)
      .then((resp) => {

        
          setUID(resp.data[0]._id)
          setName(resp.data[0].name)
          setMail(resp.data[0].email)
          setPassword(resp.data[0].password)

          console.log(UID)
         
          
          
        })
        .catch((e) => {
          alert(e);
        });
        
        if(Name != null)
        {
          history.push("/BookPage")
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
      setregisterEmail("")
      setregisterPassword("")
      setregisterName("")


    
    }
    if (!res) {
      alert("registered failed");
    }
  };


  const SearchBook = () => {
    axios
    .get(`http://localhost:5000/DetailedSearch/?txt=${search}`)
    .then(resp => {
      setData(resp.data)
      resp.send(data)
    })
    .catch(e =>{
      console.log(e)
    })
    

  } 



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
                setMail(e.target.value)
              }}
            />
            <TextField
              id="loginpassword"
              label="password"
              variant="filled"
              type="password"
              value={loginpassword}
              onChange={(e) => {setloginPassword(e.target.value) 
                setPassword1(e.target.value)
                setPassword(e.target.value)
              }}
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
              <div  class="user-form">
                <div class="login-form">
              <TextField
              id="DetailedSearch"
              label="Search For Books"
              variant="filled"
              value={search}
              onChange={(e) => {setSearch(e.target.value)}}
              />
              <Button variant="outlined" onClick={SearchBook}>Search for book</Button>
              </div>
              <div class="register-form">
                {
                  data && data.map((info, index) =>
                      <DisplayBook
                      index={index} 
                      btitle={info.title}
                      bauthors={info.authors}
                      bedition={info.edition}
                      bpublisher={info.publisher}
                      blanguage={info.language}
                      bISBN={info.ISBN}
                      />
                  )
                }
              </div>
              </div>
        
      </div>
    </>
  );
}

export default MainPage;
