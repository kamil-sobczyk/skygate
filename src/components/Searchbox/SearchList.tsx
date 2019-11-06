import * as React from 'react';
import styled from 'styled-components';
import {observer, inject} from 'mobx-react';
import {Movie} from '../../lib/Interfaces';
import {MovieCard} from './MovieCard';
import {Pagination} from './Pagination';

// interface HomePageProps {
//   store?: Store;
// }

@inject('store')
@observer
export class SearchList extends React.Component<any> {
  render() {
    const {searchData, setPrevPage, setNextPage} = this.props.store.apiClient;
    console.log(searchData);
    return (
      <>
        <Container>
          {searchData &&
            searchData.map((movie: Movie) => (
              <MovieCard
                title={movie.Title}
                year={movie.Year}
                type={movie.Type}
                plot={movie.Plot}
                id={movie.imdbID}
                key={movie.imdbID}
                img={movie.Poster}
              />
            ))}
        </Container>
        {searchData.length > 0 && <Pagination prevPage={setPrevPage} nextPage={setNextPage} />}
      </>
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
