import React, { useEffect } from "react";
import { withSSRContext } from "aws-amplify";
import Head from "next/head";
import styled from "styled-components";
import LandingPageTitle from "../src/components/Title";
import { listUsers } from "../src/graphql/queries";
import styles from "../styles/Home.module.css";
import LandingPageInformationGrid from "../src/components/LandingPageInformationGrid";
import { useRouter } from "next/router";

export async function getServerSideProps({ req }) {
  const SSR = withSSRContext({ req });
  const response = await SSR.API.graphql({ query: listUsers });
  return {
    props: {
      posts: response.data.listUsers,
    },
  };
}

export default function Home({ isAuthenticated }) {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/birthdays");
    }
  }, [isAuthenticated]);
  console.log("AUTHENTICATED", isAuthenticated);

  return (
    <div className={styles.container}>
      <Head>
        <title>Birthdays</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LandingPageTitle text="Never forget a birthday again" />

        <LandingPageInformationGrid />
      </main>
    </div>
  );
}
