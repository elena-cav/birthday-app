import React, { useState, useRef } from "react";
import styled from "styled-components";
import Head from "next/head";
import { Button } from "@aws-amplify/ui-react";
import Modal from "../src/components/Modal";
import styles from "../styles/Home.module.css";
import addBirthdaysToUser from "../src/domain/addBirthdaysToUser";
import BirthdayCard from "../src/components/BirthdayCard";

const BirthdaysWrapper = styled.div`
  display: flex;
  grid-gap: 0.6rem;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: flex-start;
`;

export default ({ cognitoUser, user, setUser }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const updatedUser = useRef(user) as React.MutableRefObject<HTMLInputElement>;

  return (
    <div className={styles.container}>
      <main>
        <h2>Birthdays for {cognitoUser?.attributes?.name}</h2>
        <Button variation="primary" onClick={() => setModalIsOpen(true)}>
          Add Birthday
        </Button>
        <BirthdaysWrapper>
          {user?.birthdays?.map(({ name, date, id }) => (
            <BirthdayCard
              user={user}
              name={name}
              date={date}
              id={id}
              key={id}
              setUser={setUser}
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
