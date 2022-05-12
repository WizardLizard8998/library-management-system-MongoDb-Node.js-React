import React, { useContext, useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./Pages.css";
import { AccountContext } from "../DATA/Accountdata";
import { useHistory } from "react-router-dom";

function MainPage() {
  const [email, setEmail1] = useState("");
  const [password, setPassword1] = useState("");
  const [name, setName1] = useState("");

  const history = useHistory();

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

  const LoginClick = async (e) => {
    setEmail1(email);
    setPassword1(password);

    let res = await fetch(
      `http://localhost:5000/getLogin/?email=${email}&password=${password}`
    );
    

      
   res = await res.json();
    
   await setId(res[0]._id);
   await setName(res[0].name);
   await setEmail(res[0].email);
   await setPassword(res[0].password);
   await setDate(res[0].date)

    console.log(res);
     console.log(Id + Name + Email + Password  );
    
    // login => if

    if(Email == email && Password == password){
     history.push("/BookPage");
    }


  };

  const RegisterClick = async (e) => {
    e.preventDefault();

    setEmail1(email);
    setName1(name);
    setPassword1(password);

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
      setName("");
      setPassword("");
      setEmail1("");
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
              id="email"
              label="email"
              variant="filled"
              type="email"
              value={email}
              onChange={(e) => setEmail1(e.target.value)}
            />
            <TextField
              id="password"
              label="password"
              variant="filled"
              type="password"
              value={password}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <Button variant="outlined" onClick={LoginClick}>
              {" "}
              Login
            </Button>
          </div>
          <div class="register-form">
            <h2>New User? Register Here!</h2>
            <TextField
              id="name"
              label="name"
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="email"
              label="email"
              variant="filled"
              type="email"
              value={email}
              onChange={(e) => setEmail1(e.target.value)}
            />
            <TextField
              id="password"
              label="password"
              variant="filled"
              value={password}
              onChange={(e) => setPassword1(e.target.value)}
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
