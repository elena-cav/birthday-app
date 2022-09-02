import React, { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { Button, Card, Heading, Text, Flex } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import Modal from "../src/components/Modal";
import styles from "../styles/Home.module.css";
import addBirthdaysToUser from "../src/domain/addBirthdaysToUser";

export default ({ cognitoUser, user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - Date.parse(birthday);
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
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
          {user?.birthdays?.map(({ name, date }, i) => (
            <Card key={i}>
              <Flex direction="column" alignItems="flex-start" gap={2}>
                <Heading level={5}>{name}</Heading>
                <Text as="span">{date}</Text>
                <Text as="span">{calculateAge(date)} years old</Text>
                <Button variation="primary">Send a card</Button>
                <Button variation="primary">Find a gift</Button>
              </Flex>
            </Card>
          ))}
        </BirthdaysWrapper>
      </main>
      <Modal
        setSuccessMessage={setSuccessMessage}
        successMessage={successMessage}
        modalIsOpen={modalIsOpen}
        closeModal={() => {
          setModalIsOpen(false);
          router.reload();
        }}
        onSubmit={async (name, date) => {
          const newUser = await addBirthdaysToUser(cognitoUser, { name, date });
          if (newUser) {
            setSuccessMessage(`${name}'s birthday successfully added`);
          }
        }}
      />
    </div>
  );
};
