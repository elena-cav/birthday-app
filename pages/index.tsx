import React, { useState } from "react";
import { withSSRContext } from "aws-amplify";
import Head from "next/head";
import { Auth } from "aws-amplify";

import { listUsers } from "../src/graphql/queries";
import styles from "../styles/Home.module.css";

export async function getServerSideProps({ req }) {
  const SSR = withSSRContext({ req });
  const response = await SSR.API.graphql({ query: listUsers });
  return {
    props: {
      posts: response.data.listUsers,
    },
  };
}

export default function Home() {
  const [userName, setUserName] = useState("");

  Auth
    .currentAuthenticatedUser()
    .then(a => setUserName(a.attributes.name));
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Birthdays</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a href="/login">Login</a>
        <h1 className={styles.title}>Birthdays</h1>
      </main>
    </div>
  );
}
