import * as React from 'react';
import styled from 'styled-components';

interface LogoProps {
    image: string;
}

export const Logo = (props: LogoProps): JSX.Element => (
  <LogoContainer>
    <img src={props.image} />
  </LogoContainer>
);

const LogoContainer = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
