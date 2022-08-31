import { Amplify, withSSRContext } from "aws-amplify";
import Head from "next/head";
import React from "react";
import awsExports from "../src/aws-exports";
import { listUsers } from "../src/graphql/queries";
import styles from "../styles/Home.module.css";

Amplify.configure({ ...awsExports, ssr: true });

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
