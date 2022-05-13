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

  const history = useHistory();

  const LoginClick = async () => {
    setEmail1(email);
    setPassword1(password);

    const res = await fetch(
      `http://localhost:5000/getLogin/?email=${email}&password=${password}`
    );

    const data = await res
      .json()
      .then((resp) => {
        setId(resp[0]._id);
        setName(resp[0].name);
        setEmail(resp[0].email);
        setPassword(resp[0].password);
        setDate(resp[0].date);

        if (resp[0] != null) {
          history.push("/BookPage");
          history.go();
        }
      })
      .catch((e) => {
        alert("couldnt log in");
      });
  };

  const RegisterClick = async (e) => {
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
