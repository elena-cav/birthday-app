import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import styled from "styled-components";
import "@aws-amplify/ui-react/styles.css";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  min-height: 100vh;
`;

export default () => (
  <Wrapper>
    <Authenticator signUpAttributes={["email", "name"]} initialState="signUp">
      {() => <main />}
    </Authenticator>
  </Wrapper>
);
