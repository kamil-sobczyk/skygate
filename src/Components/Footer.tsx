import * as React from 'react';
import styled from 'styled-components';

export const Footer = (): JSX.Element => (
  <FooteContainer>Skygate - zadanie rekrutacyjne. Kamil Sobczyk 2019</FooteContainer>
);

const FooteContainer = styled.div`
  background-color: #1857c4;
  color: #fff;
  font-weight: 200;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
