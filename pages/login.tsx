import { Authenticator } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import styled from "styled-components";

import "@aws-amplify/ui-react/styles.css";

import { createUser } from "../src/graphql/mutations";

async function handleCreateUser(event) {
  event.preventDefault();

  const form = new FormData(event.target);

  try {
    const { data } = await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: createUser,
      variables: {
        input: {
          title: form.get("title"),
          content: form.get("content"),
        },
      },
    });

    window.location.href = `/birthdays/${data.createUser.id}`;
  } catch ({ errors }) {
    console.error(...errors);
    throw new Error(errors[0].message);
  }
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
`;

export default () => (
  <Wrapper>
    <Authenticator
      signUpAttributes={["email", "name"]}
      socialProviders={["google", "facebook"]}
      initialState="signUp"
    >
      {({ signOut, user }) => (
        <main>
          <h1>Thanks, {user.attributes.name} you are now logged in!</h1>
        </main>
      )}
    </Authenticator>
  </Wrapper>
);
