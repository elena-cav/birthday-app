import { Auth } from "aws-amplify";
import styled from "styled-components";
import { useRouter } from "next/router";

import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const NavBarWrapper = styled.div`
  margin: 12px;
`;

const Title = styled.h2`
  margin: 0 auto;
  float: left;
`;

const SignoutButton = styled(Button)`
  float: right;
`;

export default ({ isAuthenticated }) => {
  const router = useRouter();

  return (
    <NavBarWrapper>
      <Title>Birthdays</Title>

      <SignoutButton 
        variation="primary" 
        type="button"
        onClick={() => isAuthenticated ? Auth.signOut() : router.push("/login")}
      >
        {isAuthenticated ? "Sign out" : "Login"}
      </SignoutButton>
    </NavBarWrapper>
  );
};
