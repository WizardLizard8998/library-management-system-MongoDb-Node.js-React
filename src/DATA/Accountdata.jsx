import React from "react";
import { createContext, useState } from "react";

const AccountContext = createContext();

function AccountProvider(props) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Date, setDate] = useState("");
  const [Id, setId] = useState("");
  
  return (
    <AccountContext.Provider
      value={{
        Name: Name,
        Email: Email,
        Password: Password,
        Date: Date,
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
