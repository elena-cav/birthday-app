import React from "react";
import Modal from "react-modal";
import LandingPageTitle from "../components/Title";
import { TextField } from "@aws-amplify/ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
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
`;

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#yourAppElement");

export default () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <LandingPageTitle text="Add a new birthday" />

        <button onClick={closeModal}>
          {" "}
          <StyledIcon icon={faClose} />
        </button>
        <div>I am a modal</div>
        <form>
          <TextField
            label=""
            placeholder="Name"
            errorMessage="There is an error"
          />
          <TextField label="" type="date" errorMessage="There is an error" />
        </form>
      </Modal>
    </div>
  );
};
