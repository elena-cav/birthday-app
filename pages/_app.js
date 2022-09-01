import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { Auth } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";

import "../styles/globals.css";
import awsExports from "../src/aws-exports";
import Navbar from "../src/components/Navbar";
import PageGrid from "../src/components/PageGrid";
import App from "next/app";

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

  const App = () => {
    const { route } = useAuthenticator((context) => [context.route]);

    return route === "authenticated" ? (
      <PageGrid>
        <Navbar
          setIsAuthenticated={setIsAuthenticated}
          isAuthenticated={true}
        />
        <Component {...pageProps} user={user} />
      </PageGrid>
    ) : (
      <PageGrid>
        <Navbar
          setIsAuthenticated={setIsAuthenticated}
          isAuthenticated={false}
        />
        <Component {...pageProps} user={user} />
      </PageGrid>
    );
  };

  return (
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  );
}

export default MyApp;
