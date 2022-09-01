import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { TextField, Text, Button } from "@aws-amplify/ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import LandingPageTitle from "../components/Title";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const StyledIcon = styled(FontAwesomeIcon)`
  height: 32px;
  color: black;
`;

const ClosingCross = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Error = styled(Text)`
  min-height: 1.2rem;
`;
export default ({ modalIsOpen, closeModal, onSubmit }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedDate = Date.parse(date);
    const timeDiff = Date.now() - parsedDate;
    if (timeDiff < 0) {
      setError("Birthday cannot be in the future");
      return;
    }
    if (!name) {
      setError("Please insert a name");
      return;
    } else {
      onSubmit(name, date);
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <LandingPageTitle text="Add a new birthday" />

        <ClosingCross onClick={closeModal}>
          <StyledIcon icon={faClose} />
        </ClosingCross>

        <Form onSubmit={handleSubmit}>
          <Error>{error}</Error>
          <TextField
            required={true}
            label=""
            placeholder="Name"
            errorMessage="There is an error"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required={true}
            label=""
            type="date"
            errorMessage="There is an error"
            onChange={(e) => setDate(e.target.value)}
          />
          <input type="submit" />
        </Form>
      </Modal>
    </div>
  );
};
