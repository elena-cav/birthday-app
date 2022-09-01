import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Head from "next/head";
import { Button } from "@aws-amplify/ui-react";

import Modal from "../src/components/Modal";

import { getUser } from "../src/graphql/queries";
import { updateUser } from "../src/graphql/mutations";
import styles from "../styles/Home.module.css";

const createBirthday = async (newBirthday) => {
  const oldBirthdays = [];
  await API.graphql(graphqlOperation(updateUser, { input: { birthdays: [...oldBirthdays, newBirthday] }}));
}

const getBirthdays = async (user) => {
  const userData = await API.graphql(graphqlOperation(getUser, { userId: "" }));

  console.log(userData);
  
  // return userData.birthdays;
}

export default ({ cognitoUser, user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log(user);

  return (
    <div className={styles.container}>
      <Head>
        <title>Birthdays</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2>Birthdays for {cognitoUser?.attributes?.name}</h2>
        <Button variation="primary" onClick={() => setModalIsOpen(true)}>Add Birthday</Button>
        <h2>Birthdays</h2>
        {user?.birthdays?.map((birthday) => (
          <span>{birthday}</span>
        ))}
      </main>
      <Modal modalIsOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} />
    </div>
  );
}
