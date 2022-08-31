import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { Auth } from "aws-amplify";

import "../styles/globals.css";
import awsExports from "../src/aws-exports";
import Navbar from "../components/Navbar";
import PageGrid from "../components/PageGrid";

Amplify.configure({ ...awsExports, ssr: true });
Auth.configure(awsExports);

function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(setUser)
      .then(() => {
        console.log("RERENDERING");
        return setIsAuthenticated(true);
      })
      .catch(() => console.log("no user logged in"));
  }, []);

  return (
    <PageGrid>
      <Navbar
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />
      <Component {...pageProps} user={user} />
    </PageGrid>
  );
}

export default MyApp;
