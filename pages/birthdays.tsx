import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Head from "next/head";
import { Button } from "@aws-amplify/ui-react";

import Modal from "../src/components/Modal";

import { getUser } from "../src/graphql/queries";
import { updateUser } from "../src/graphql/mutations";
import styles from "../styles/Home.module.css";
import addBirthdaysToUser from "../src/domain/addBirthdaysToUser";

export default ({ cognitoUser, user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Birthdays</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2>Birthdays for {cognitoUser?.attributes?.name}</h2>
        <Button variation="primary" onClick={() => setModalIsOpen(true)}>
          Add Birthday
        </Button>
        <h2>Birthdays</h2>
        {user?.birthdays?.map((birthday) => (
          <>
            <span>{birthday.name}</span>
            <span>{birthday.date}</span>
          </>
        ))}
      </main>
      <Modal
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        onSubmit={(name, date) => {
          addBirthdaysToUser(cognitoUser, { name, date });
        }}
      />
    </div>
  );
};
