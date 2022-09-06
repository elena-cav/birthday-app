import React, { useState, useRef } from "react";
import styled from "styled-components";
import Head from "next/head";
import { Button } from "@aws-amplify/ui-react";
import Modal from "../src/components/Modal";
import styles from "../styles/Home.module.css";
import addBirthdaysToUser from "../src/domain/addBirthdaysToUser";
import BirthdayCard from "../src/components/BirthdayCard";

export default ({ cognitoUser, user, setUser }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const updatedUser = useRef() as React.MutableRefObject<HTMLInputElement>;

  const BirthdaysWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    justify-content: flex-start;
  `;
  const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `;
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
        <BirthdaysWrapper>
          {user?.birthdays?.map(({ name, date, birthdayId }) => (
            <BirthdayCard
              user={user}
              name={name}
              date={date}
              birthdayId={birthdayId}
              key={birthdayId}
            />
          ))}
        </BirthdaysWrapper>
      </main>
      <Modal
        setSuccessMessage={setSuccessMessage}
        successMessage={successMessage}
        modalIsOpen={modalIsOpen}
        closeModal={() => {
          setModalIsOpen(false);
          setUser(updatedUser?.current);
        }}
        onSubmit={async (name, date) => {
          const id = Math.random().toString();
          const newUser = await addBirthdaysToUser(cognitoUser, {
            name,
            date,
            id,
          });
          if (newUser) {
            setSuccessMessage(`${name}'s birthday successfully added`);
          }
          updatedUser.current = newUser;
        }}
      />
    </div>
  );
};
