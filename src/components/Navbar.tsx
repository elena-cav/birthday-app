import { Auth } from "aws-amplify";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import React from "react";
import Link from "next/link";

const NavBarWrapper = styled.div`
  padding: 2rem 2rem;

  @media screen and (min-width: 1024px) {
    padding: 2rem 4rem;
  }
`;

const Title = styled.h1`
  margin: 0 auto;
  float: left;
  background: linear-gradient(40deg, #fffc00 0%, #fc00ff 45%, #00fffc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
