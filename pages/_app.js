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
  const router = useRouter();

  console.log(user);
  console.log("AUTHENTICATED", isAuthenticated);

  useEffect(() => {
    console.log("RERENDERING");
    Auth.currentAuthenticatedUser()
      .then(setUser)
      .catch(() => console.log("no user logged in"));

    if (isAuthenticated) {
      router.push("/birthdays");
    }
  }, [isAuthenticated]);

  const App = () => {
    const { route } = useAuthenticator((context) => [context.route]);

    useEffect(() => {
      setIsAuthenticated(route === "authenticated");
    }, [route]);

    return (
      <PageGrid>
        <Navbar
          setIsAuthenticated={setIsAuthenticated}
          isAuthenticated={isAuthenticated}
        />
        <Component
          {...pageProps}
          user={user}
          isAuthenticated={isAuthenticated}
        />
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
