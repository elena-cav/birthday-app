import React from "react";
import styled from "styled-components";

const LandingPageInformationGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;

const LandingPageInformationItem = styled.div`
  flex-grow: 1;
`;

const LandingPageInformationItemText = styled.p`
  text-align: center;
`;

export default () => (
  <LandingPageInformationGrid>
    <LandingPageInformationItem>
      <LandingPageInformationItemText>
        Get email and SMS notifications
      </LandingPageInformationItemText>
    </LandingPageInformationItem>

    <LandingPageInformationItem>
      <LandingPageInformationItemText>
        Link to your Moonpig account
      </LandingPageInformationItemText>
    </LandingPageInformationItem>

    <LandingPageInformationItem>
      <LandingPageInformationItemText>
        Get and store gift ideas
      </LandingPageInformationItemText>
    </LandingPageInformationItem>
  </LandingPageInformationGrid>
);
