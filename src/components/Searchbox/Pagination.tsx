import * as React from 'react';
import styled from 'styled-components';
import {Button} from '@rmwc/button';

interface PaginationProps {
  prevPage: () => void;
  nextPage: () => void;
}

export const Pagination = (props: PaginationProps): JSX.Element => (
  <PaginationContainer>
    <Button raised onClick={props.prevPage}>PREVIOUS PAGE</Button>
    <Button raised onClick={props.nextPage}>NEXT PAGE</Button>
  </PaginationContainer>
);

const PaginationContainer = styled.div`
width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
