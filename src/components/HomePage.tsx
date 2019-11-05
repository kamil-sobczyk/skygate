import * as React from 'react';
import styled from 'styled-components';
import {observer, inject} from 'mobx-react';
import {Store} from '../lib/Store';
import {SearchboxContainer} from './Searchbox/SearchboxContainer';
import {SearchList} from './Searchbox/SearchList';

interface HomePageProps {
  store?: Store;
}

@inject('store')
@observer
export class HomePage extends React.Component<any> {
  render() {
    return (
      <Container>
        <h1>Movie search app</h1>
        <SearchboxContainer />
        <SearchList />
      </Container>
    );
  }
}

const Container = styled.div`
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
