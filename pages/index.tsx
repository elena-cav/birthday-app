import React from "react";
import { withSSRContext } from "aws-amplify";
import Head from "next/head";
import styled from "styled-components";

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

const LandingPageInformationGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;

const LandingPageInformationItem = styled.div`
  flex-grow: 1;
`;

const LandingPageInformationItemText = styled.p`
  text-align: center;
`;

const LandingPageTitle = styled.h1`
  text-align: center;
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;

  background-image: linear-gradient(
    -225deg,
    #231557 0%,
    #44107a 29%,
    #ff1361 67%,
    #fff800 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite;
  display: inline-block;

  @keyframes textclip {
    to {
      background-position: 200% center;
    }
  }
`;

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Birthdays</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LandingPageTitle className={styles.title}>Never forget a birthday again!</LandingPageTitle>

        <LandingPageInformationGrid>
          <LandingPageInformationItem>
            <LandingPageInformationItemText>Get email and SMS notifications</LandingPageInformationItemText>
          </LandingPageInformationItem>

          <LandingPageInformationItem>
            <LandingPageInformationItemText>Link to your Moonpig account</LandingPageInformationItemText>
          </LandingPageInformationItem>

          <LandingPageInformationItem>
            <LandingPageInformationItemText>Get and store get ideas</LandingPageInformationItemText>
          </LandingPageInformationItem>
        </LandingPageInformationGrid>
      </main>
    </div>
  );
}
