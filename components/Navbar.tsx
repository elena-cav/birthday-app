import { Auth } from "aws-amplify";
import styled from "styled-components";

const NavBarWrapper = styled.div`
  margin: 12px;
`;

const Title = styled.h2`
  margin: 0 auto;
  float: left;
`;

const SignoutButton = styled.button`
  float: right;
`;

export default () => {
  return (
    <NavBarWrapper>
      <Title>Birthdays</Title>

      <SignoutButton type="button" onClick={() => Auth.signOut()}>
        Sign out
      </SignoutButton>
    </NavBarWrapper>
  );
};
