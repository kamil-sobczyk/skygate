import * as React from 'react';
import styled from 'styled-components';
import {observer, inject} from 'mobx-react';
import {Movie} from '../../lib/Interfaces';
import MovieCard from './MovieCard';
import {Pagination} from './Pagination';
import {Store} from '../../lib/Store';

interface SearchListProps {
  store?: Store;
}

@inject('store')
@observer
export class SearchList extends React.Component<SearchListProps> {
  render() {
    const {searchData, setPrevPage, setNextPage, showWishList, moviesFromWishList} = this.props.store!.apiClient;
    const chosenData = showWishList ? moviesFromWishList : searchData;
    console.log('showWish',showWishList)
    console.log('chosen',chosenData)
    return (
      <>
        <Container>
          {chosenData &&
            chosenData.map((movie: Movie) => (
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
        {chosenData === searchData && chosenData.length > 0 && (
          <Pagination prevPage={setPrevPage} nextPage={setNextPage} />
        )}
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
