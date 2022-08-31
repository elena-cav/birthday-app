import { Auth } from "aws-amplify";

export default () => (
  <button type="button" onClick={() => Auth.signOut()}>
    Sign out
  </button>
);
