import { Auth } from "aws-amplify";
import styled from "styled-components";

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

export default () => {
  return (
    <NavBarWrapper>
      <Title>Birthdays</Title>

      <SignoutButton 
        variation="primary" 
        type="button"
        onClick={() => Auth.signOut()}
      >
        Sign out
      </SignoutButton>
    </NavBarWrapper>
  );
};
