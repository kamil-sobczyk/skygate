import axios from 'axios';
import {observable, action} from 'mobx';
import {Store} from './Store';
import {Movie} from './Interfaces';

export class ApiClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  private readonly apiKey = '57582787';
  private readonly apiUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}&`;
  private searchTitle: string = '';
  private searchID: string = '';
  private searchYearOfRelease: number = 0;
  @observable data?: Movie[];

  getSearchTitle = (): string => this.searchTitle;
  @action setSearchTitle = (title: string): string => (this.searchTitle = title);

  getSearchID = (): string => this.searchID;
  @action setSearchID = (id: string): string => (this.searchID = id);

  getSearchYearOfRelease = (): number => this.searchYearOfRelease;
  @action setSearchYearOfRelease = (year: number): number => (this.searchYearOfRelease = year);

  @action fetchData = async (): Promise<any> => {
    await axios({
      method: 'get',
      url: `${this.apiUrl}s=${this.getSearchTitle()}${
        this.getSearchYearOfRelease() !== 0 ? `&y=${this.getSearchYearOfRelease()}` : ``
      }`,
    }).then(response => this.setData(response.data.Search));
  };
  @action setData = (data: Movie[]) => {
    console.log(data);
    this.data = data;
  };
}
