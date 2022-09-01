import { Auth } from "aws-amplify";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import React from "react";
import Link from "next/link";

const NavBarWrapper = styled.div`
  padding: 2rem 3rem;
`;

const Title = styled.h1`
  margin: 0 auto;
  float: left;
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

  return (
    <NavBarWrapper>
      <Title>
        <Link href="/">Birthdays</Link>
      </Title>
      <AuthButton variation="primary" type="button" onClick={loginSignout}>
        {isAuthenticated ? "Sign out" : "Login"}
      </AuthButton>
    </NavBarWrapper>
  );
};
