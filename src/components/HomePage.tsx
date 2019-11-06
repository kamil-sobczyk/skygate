import * as React from 'react';
import styled from 'styled-components';
import {SearchboxContainer} from './SearchContainer';
import {SearchList} from './Searchbox/SearchList';

export const HomePage = () => (
  <Container>
    <h1>Movie search app</h1>
    <SearchboxContainer />
    <SearchList />
  </Container>
);

const Container = styled.div`
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
