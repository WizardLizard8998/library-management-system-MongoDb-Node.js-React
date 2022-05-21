import { Typography } from "@mui/material";
import React, { createContext } from "react";
import { AccountContext } from "./AccountProvider";

export default function Deneme() {
  const {  Name} = createContext(AccountContext);

  return (
    <>
      <AccountContext.Consumer>
          <Typography type="h2">{Name}</Typography>;
        
      </AccountContext.Consumer>
    </>
  );
}
