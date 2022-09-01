import React, { useState } from "react";
import Modal from "react-modal";
import { TextField, Button } from "@aws-amplify/ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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

export default ({ modalIsOpen, closeModal, onSubmit }) => {
  const [name, setName] = useState(null);
  const [date, setDate] = useState(null);

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

        <Form>
          <TextField
            label=""
            placeholder="Name"
            errorMessage="There is an error"
            onChange={setName}
          />
          <TextField
            label=""
            type="date"
            errorMessage="There is an error"
            onChange={setDate}
          />
          <Button
            variation="primary"
            onClick={() => {
              onSubmit(name, date);
            }}
          >
            Add
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
