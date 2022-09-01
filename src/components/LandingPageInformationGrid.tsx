import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faCartShopping,
  faGift,
} from "@fortawesome/free-solid-svg-icons";

const LandingPageInformationGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;

const LandingPageInformationItem = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const LandingPageInformationItemText = styled.p`
  text-align: center;
`;
const StyledIcon = styled(FontAwesomeIcon)`
  height: 32px;
`;

export default () => (
  <LandingPageInformationGrid>
    <LandingPageInformationItem>
      <StyledIcon icon={faEnvelope} />
      <LandingPageInformationItemText>
        Get email and SMS notifications
      </LandingPageInformationItemText>
    </LandingPageInformationItem>

    <LandingPageInformationItem>
      <StyledIcon icon={faGift} />

      <LandingPageInformationItemText>
        Link to your Moonpig account
      </LandingPageInformationItemText>
    </LandingPageInformationItem>

    <LandingPageInformationItem>
      <StyledIcon icon={faCartShopping} />
      <LandingPageInformationItemText>
        Get and store gift ideas
      </LandingPageInformationItemText>
    </LandingPageInformationItem>
  </LandingPageInformationGrid>
);
