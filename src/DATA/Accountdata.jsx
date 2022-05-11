import React from "react";
import { createContext, useState } from "react";

const AccountContext = createContext();

function AccountProvider(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [Id, setId] = useState("");

  return (
    <AccountContext.Provider
      value={{
        Name: name,
        Email: email,
        Password: password,
        Date: date,
        Id : Id,
        
        setName,
        setEmail,
        setPassword,
        setDate,
        setId,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
}

export { AccountContext, AccountProvider };
