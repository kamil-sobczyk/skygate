import * as React from 'react';
import styled from 'styled-components';
import {observer, inject} from 'mobx-react';
import {Movie} from '../../lib/Interfaces';
import {MovieCard} from './MovieCard';
import {observable} from 'mobx';
import {Store} from '../../lib/Store';

// interface HomePageProps {
//   store?: Store;
// }

@inject('store')
@observer
export class SearchList extends React.Component<any> {
  @observable data?: Movie[] = this.props.store.apiClient.getData();

  render() {
    const {getData} = this.props.store.apiClient;
    console.log('ss', this.props.data);
    return (
      <Container>
        Movies
        {this.props.data &&
          this.props.data.map((movie: Movie) => (
            <MovieCard
              title={movie.Title}
              year={movie.Year}
              type={movie.Type}
              plot={movie.Title}
              id={movie.imdbID}
              key={movie.Title}
            />
          ))}
      </Container>
    );
  }
}

const Container = styled.div`
  min-width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`;
