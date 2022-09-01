import React, { useState } from "react";
import { withSSRContext } from "aws-amplify";
import styled from "styled-components";
import Head from "next/head";
import Modal from "../src/components/Modal";
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

export default function Birthdays({ user }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Birthdays</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Birthdays for {user?.attributes?.name}</h1>
      </main>
      <Modal />
    </div>
  );
}
