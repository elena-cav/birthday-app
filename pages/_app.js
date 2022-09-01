import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { Auth } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import "../styles/globals.css";
import awsExports from "../src/aws-exports";
import Navbar from "../src/components/Navbar";
import PageGrid from "../src/components/PageGrid";

import addUserToDatabase from "../src/domain/addUserToDatabase";

Amplify.configure({ ...awsExports, ssr: true });
Auth.configure(awsExports);

function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cognitoUser, setCognitoUser] = useState({});
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(setCognitoUser)
      .catch(() => console.log("no user logged in"));

    if (isAuthenticated) {
      router.push("/birthdays");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    addUserToDatabase(cognitoUser)
      .then(setUser)
      .catch((e) => console.log(e));
  }, [cognitoUser]);

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
          isAuthenticated={isAuthenticated}
          cognitoUser={cognitoUser}
          user={user}
        />
      </PageGrid>
    );
  };

  return (
    <Authenticator.Provider>
      <NextNProgress />
      <App />
    </Authenticator.Provider>
  );
}

export default MyApp;
