import { Button, Card, Heading, Text, Flex } from "@aws-amplify/ui-react";
import deleteBirthdayfromUser from "../domain/deleteBirthdayfromUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import GiftIcon from "../../public/gift.svg";
import BirthdayCardIcon from "../../public/birthday-card.svg";
import styled from "styled-components";

import ClosingCross from "../components/ClosingCross";
import Image from "next/image";

const StyledIcon = styled(FontAwesomeIcon)`
  height: 28px;
  color: #414361;

  &:hover {
    color: #2a2d43;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 0.5rem;
  max-width: 6rem;
`;

const BirthdayCard = styled(Card)`
  flex: 1 0 300px;
  box-sizing: border-box;
  margin: 1rem 0.25em;
  position: relative;
  box-shadow: 0 15px 60px rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  background-image: linear-gradient(
    40deg,
    #fffc00 0%,
    #fc00ff 45%,
    #00fffc 100%
  );

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (min-width: 35em) {
    max-width: calc(50% - 1em);
  }

  @media screen and (min-width: 60em) {
    max-width: calc(25% - 1em);
  }
  @media screen and (min-width: 80em) {
    max-width: calc(20% - 1em);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-self: center;
`;

export default ({ name, id, date, user, setUser }) => {
  const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - Date.parse(birthday);
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  const parseDate = (date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-UK", options);
  };

  return (
    <BirthdayCard key={id}>
      <ClosingCross
        onClick={async () => {
          const newUser = await deleteBirthdayfromUser(user.id, id);
          console.log("NEWUSER", newUser);
          setUser(newUser);
        }}
      >
        <StyledIcon icon={faClose} />
      </ClosingCross>
      <Flex direction="column" alignItems="flex-start" gap={2}>
        <Heading color="white" level={5}>
          {name}
        </Heading>
        <Text color="white" as="span">
          {parseDate(date)}
        </Text>
        <Text color="white" as="span">
          {calculateAge(date)} years old
        </Text>

        <ButtonContainer>
          <StyledButton
            onClick={() => {
              window.open("https://www.moonpig.com/uk/", "_blank");
            }}
            variation="primary"
          >
            <Image alt="birthday-card-icon" src={BirthdayCardIcon}></Image>
          </StyledButton>
          <StyledButton
            onClick={() => {
              window.open(
                "https://www.amazon.co.uk/?&_encoding=UTF8&tag=birthdayapp-21&linkCode=ur2&linkId=673f2dbadacc321e00320815cb676b3a&camp=1634&creative=6738",
                "_blank"
              );
            }}
            variation="primary"
          >
            <Image alt="gift-icon" src={GiftIcon}></Image>
          </StyledButton>
        </ButtonContainer>
      </Flex>
    </BirthdayCard>
  );
};
