import axios from 'axios';
import {observable, action} from 'mobx';
import {Store} from './Store';
import {Movie, SearchType} from './Interfaces';
import {apiKey} from '../../config';

export class ApiClient {
  store: Store;
  
  constructor(store: Store) {
    this.store = store;
  }

//   private readonly apiKey = '57582787';
  private readonly apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`;
  private searchTitle: string = '';
  private searchID: string = '';
  private searchType: SearchType;
  private searchYearOfRelease: number = 0;
  private currentPage: number = 1;
  @observable searchData: Movie[] = [];

  getSearchTitle = (): string => this.searchTitle;
  @action setSearchTitle = (title: string): string => (this.searchTitle = title);

  getSearchID = (): string => this.searchID;
  @action setSearchID = (id: string): string => (this.searchID = id);

  getSearchYearOfRelease = (): number => this.searchYearOfRelease;
  @action setSearchYearOfRelease = (year: number): number => (this.searchYearOfRelease = year);

  getSearchType = () => this.searchType;
  @action setSearchType = (type: SearchType): SearchType => (this.searchType = type);

  getCurrentPage = (): number => this.currentPage;
  @action setNextPage = (): void => {
    if (this.currentPage <= 99) {
      this.currentPage++;
      this.fetchData();
    }
  };
  @action setPrevPage = (): void => {
    if (this.currentPage >= 2) {
      this.currentPage--;
      this.fetchData();
    }
  };

  @action fetchData = async (): Promise<any> => {
    let data: any = [];
    const fullUrl = `${this.apiUrl}s=${this.getSearchTitle()}${
      this.getSearchYearOfRelease() !== 0 ? `&y=${this.getSearchYearOfRelease()}` : ``
    }${this.getSearchType() ? `&type=${this.getSearchType()}` : ``}&page=${this.getCurrentPage}`;

    this.setData([]);

    await axios({
      method: 'get',
      url: fullUrl,
    }).then(response => {
      data = response.data.Search;
    });

    data.forEach(async (movie: any, index: number) => {
      await axios({
        method: 'get',
        url: `${this.apiUrl}i=${movie.imdbID}&plot=short`,
      }).then(response => this.searchData.push(response.data));
    });
  };
  @action setData = (data: Movie[]) => {
    console.log(data);
    this.searchData = data;
  };
}
