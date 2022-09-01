import { Auth } from "aws-amplify";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import React from "react";

const NavBarWrapper = styled.div`
  margin: 12px;
`;

const Title = styled.a`
  margin: 0 auto;
  float: left;
  font-size: 2rem;
  font-weight: bold;
`;

const AuthButton = styled(Button)`
  float: right;
`;

export default ({ isAuthenticated, setIsAuthenticated }) => {
  const router = useRouter();
  async function loginSignout() {
    try {
      if (isAuthenticated) {
        await Auth.signOut();
        setIsAuthenticated(false);
        router.push("/");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  console.log("AUTHENTICATED", isAuthenticated);
  return (
    <NavBarWrapper>
      <Title href="/">Birthdays</Title>
      <AuthButton variation="primary" type="button" onClick={loginSignout}>
        {isAuthenticated ? "Sign out" : "Login"}
      </AuthButton>
    </NavBarWrapper>
  );
};
