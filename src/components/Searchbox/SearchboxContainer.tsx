import * as React from 'react';
import styled from 'styled-components';
import {observer, inject} from 'mobx-react';
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

// interface HomePageProps {
//   store?: Store;
// }

@inject('store')
@observer
export class SearchboxContainer extends React.Component<any> {
  private readonly firstMovieReleaseYear: number = 1886;
  private readonly currentYear: number = new Date().getFullYear();

  private readonly parseDatesToString = (array: number[]): string[] =>
    array.map((number: number): string => String(number));

  private readonly getYearsRange: number[] = Array.from(
    {length: this.currentYear + 1 - this.firstMovieReleaseYear},
    (_, i) => this.firstMovieReleaseYear + i,
  ).reverse();

  getData = () => {
    this.props.store.apiClient.fetchData();
    this.props.update();
    this.props.update();
  };

  render() {
    const {apiClient} = this.props.store;
    console.log(apiClient);
    return (
      <SearchContainer>
        <TextField
          label='Title'
          required
          onChange={(e: React.FormEvent<HTMLInputElement>) => apiClient.setSearchTitle(e.currentTarget.value)}
        />
        <TextField
          label='IMDB ID'
          onChange={(e: React.FormEvent<HTMLInputElement>) => apiClient.setSearchID(e.currentTarget.value)}
        />
        <Select
          label='Year'
          enhanced
          options={this.parseDatesToString(this.getYearsRange)}
          onChange={(e: React.FormEvent<HTMLInputElement>) => apiClient.setSearchYearOfRelease(e.currentTarget.value)}
        />
        <Button label='Search' raised onClick={() => this.getData()} />
      </SearchContainer>
    );
  }
}

const SearchContainer = styled.div`
  min-height: 75px;
  min-width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  @media (min-width: 1200px) {
    border: 1px solid lightgray;
    box-shadow: 10px 10px 31px -4px rgba(184, 184, 184, 1);
    border-radius: 25px;
  }
`;
