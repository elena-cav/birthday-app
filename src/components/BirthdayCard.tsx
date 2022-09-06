import { Button, Card, Heading, Text, Flex } from "@aws-amplify/ui-react";
import deleteBirthdayfromUser from "../domain/deleteBirthdayfromUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledIcon = styled(FontAwesomeIcon)`
  height: 32px;
  color: black;
`;
const BirthdayCard = styled(Card)`
  position: relative;
`;

const ClosingCross = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;

export default ({ name, id, date, user, setUser }) => {
  const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - Date.parse(birthday);
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <BirthdayCard key={id}>
      <ClosingCross
        onClick={() => {
          const newUser = deleteBirthdayfromUser(user.id, id);
          setUser(newUser);
        }}
      >
        <StyledIcon icon={faClose} />
      </ClosingCross>
      <Flex direction="column" alignItems="flex-start" gap={2}>
        <Heading level={5}>{name}</Heading>
        <Text as="span">{date}</Text>
        <Text as="span">{calculateAge(date)} years old</Text>
        <Button variation="primary">Send a card</Button>
        <Button variation="primary">Find a gift</Button>
      </Flex>
    </BirthdayCard>
  );
};
