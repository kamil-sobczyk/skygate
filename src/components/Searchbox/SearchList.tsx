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
  render() {
    const {data} = this.props.store.apiClient;
    return (
      <Container>
        {data &&
          data.map((movie: Movie) => (
            <MovieCard
              title={movie.Title}
              year={movie.Year}
              type={movie.Type}
              plot={movie.Title}
              id={movie.imdbID}
              key={movie.Title}
              img={movie.Poster}
            />
          ))}
      </Container>
    );
  }
}

const Container = styled.div`
  min-width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
`;
