import { createContext, useState } from "react";
import React from "react";

const AccountContext = createContext();

function AccountProvider(props) {
  const [Mail, setMail] = useState("");
  const [Password, setPassword] = useState("");
  const [UID, setUID] = useState("");
  const [Name,setName] = useState("");  
  

  return (
    <AccountContext.Provider
      value={{
        Mail: Mail,
        Password: Password,  
        UID: UID,
        Name:Name,

        setMail,
        setPassword,

        setUID,
        setName,
        
      }}
    >
      {props.children}
      
    </AccountContext.Provider>
  );
}

export {AccountContext, AccountProvider};