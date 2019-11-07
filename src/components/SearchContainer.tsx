import * as React from 'react';
import styled from 'styled-components';
import {observer, inject} from 'mobx-react';
import {Store} from '../lib/Store';
import {TextField} from '@rmwc/textfield';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import {Select} from '@rmwc/select';
import '@material/select/dist/mdc.select.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';
import {Button} from '@rmwc/button';
import '@material/button/dist/mdc.button.css';
import {MovieType} from '../lib/Interfaces';

interface HomePageProps {
  store?: Store;
}

@inject('store')
@observer
export class SearchboxContainer extends React.Component<HomePageProps> {
  private readonly firstMovieReleaseYear: number = 1886;
  private readonly currentYear: number = new Date().getFullYear();
  private readonly MovieTypes: MovieType[] = ['movie', 'series', 'episode'];

  private parseDatesToString = (array: number[]): string[] => array.map((number: number): string => String(number));

  private readonly getYearsRange: number[] = Array.from(
    {length: this.currentYear + 1 - this.firstMovieReleaseYear},
    (_, i) => this.firstMovieReleaseYear + i,
  ).reverse();

  handleEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.props.store!.apiClient.fetchSearchData();
      e.preventDefault();
    }
  };

  render() {
    const {
      setSearchTitle,
      setMovieType,
      setSearchYearOfRelease,
      fetchWishList,
      fetchSearchData,
    } = this.props.store!.apiClient;
    return (
      <>
        <SearchContainer>
          <TextField
            label='Title'
            onChange={(e: React.FormEvent<HTMLInputElement>) => setSearchTitle(e.currentTarget.value)}
            onKeyPress={(e: React.KeyboardEvent) => this.handleEnterPress(e)}
          />
          <Select
            label='Type'
            enhanced
            options={this.MovieTypes as string[]}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setMovieType(e.currentTarget.value as MovieType)}
          />
          <Select
            label='Year'
            enhanced
            options={this.parseDatesToString(this.getYearsRange)}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setSearchYearOfRelease(parseInt(e.currentTarget.value))}
          />
        </SearchContainer>
        <ButtonsContainer>
          <Button label='Show wishlist' raised onClick={() => fetchWishList()} />
          <Button label='Search' raised onClick={() => fetchSearchData()} />
        </ButtonsContainer>
      </>
    );
  }
}

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .mdc-button {
    width: 30%;
    border-radius: 0;
  }
  @media (min-width: 768px) {
    .mdc-button {
      width: 300px;
    }
  }
`;

const SearchContainer = styled.div`
  min-height: 75px;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .mdc-text-field,
  .mdc-select {
    width: 100%;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
    .mdc-text-field,
    .mdc-select {
      max-width: 140px;
    }
  }
`;
