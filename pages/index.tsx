import React from "react";
import Head from "next/head";
import LandingPageTitle from "../src/components/Title";
import styles from "../styles/Home.module.css";
import LandingPageInformationGrid from "../src/components/LandingPageInformationGrid";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Birthdays</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LandingPageTitle
          text="Never forget a birthday again"
          size={undefined}
        />

        <LandingPageInformationGrid />
      </main>
    </div>
  );
}
