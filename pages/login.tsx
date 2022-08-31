import { Authenticator } from "@aws-amplify/ui-react";

import '@aws-amplify/ui-react/styles.css';

import { API, Auth } from "aws-amplify";
import styled from "styled-components";

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
    <Authenticator signUpAttributes={['email']} socialProviders={['google', 'facebook']} initialState="signUp">
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>

  
      {/* <form onSubmit={handleCreateUser}>
        <fieldset>
          <legend>Title</legend>
          <input
            defaultValue={`Today, ${new Date().toLocaleTimeString()}`}
            name="title"
          />
        </fieldset>

        <fieldset>
          <legend>Content</legend>
          <textarea
            defaultValue="I built an Amplify app with Next.js!"
            name="content"
          />
        </fieldset>

        <button>Create Post</button>
        <button type="button" onClick={() => Auth.signOut()}>
          Sign out
        </button>
      </form> */}
  </Wrapper>
);
