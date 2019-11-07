import axios from 'axios';
import {observable, action} from 'mobx';
import {Store} from './Store';
import {Movie, MovieType, Wish} from './Interfaces';
import {apiKey} from '../../config';

export class ApiClient {
  store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  private readonly apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`;
  private searchTitle: string = '';
  private MovieType?: MovieType;
  private searchYearOfRelease: number = 0;
  private currentPage: number = 1;
  @observable moviesFromWishList: Movie[] = [];
  @observable searchData: Movie[] = [];
  @observable showWishList: boolean = false;

  getSearchTitle = (): string => this.searchTitle;
  @action setSearchTitle = (title: string): string => (this.searchTitle = title);

  getSearchYearOfRelease = (): number => this.searchYearOfRelease;
  @action setSearchYearOfRelease = (year: number): number => (this.searchYearOfRelease = year);

  getMovieType = () => this.MovieType;
  @action setMovieType = (type: MovieType): MovieType => (this.MovieType = type);

  getCurrentPage = (): number => this.currentPage;
  @action setNextPage = (): void => {
    if (this.currentPage <= 99) {
      this.currentPage++;
      this.fetchSearchData();
    }
  };
  @action setPrevPage = (): void => {
    if (this.currentPage >= 2) {
      this.currentPage--;
      this.fetchSearchData();
    }
  };

  @action fetchSearchData = async (): Promise<void> => {
    let data: [] = [];
    const fullUrl = `${this.apiUrl}s=${this.getSearchTitle()}${
      this.getSearchYearOfRelease() !== 0 ? `&y=${this.getSearchYearOfRelease()}` : ``
    }${this.getMovieType() ? `&type=${this.getMovieType()}` : ``}&page=${this.getCurrentPage}`;

    this.setShowHideWishList(false);
    this.setSearchData([]);

    await axios({
      method: 'get',
      url: fullUrl,
    }).then(response => {
      data = response.data.Search;
    });

    data.map(async (movie: Movie) => {
      await axios({
        method: 'get',
        url: `${this.apiUrl}i=${movie.imdbID}&plot=short`,
      }).then(response => this.searchData.push(response.data));
    });

    this.setSearchData(this.removeDuplicates(this.searchData));
  };

  @action fetchWishList = async (): Promise<void> => {
    const moviesFromWishListIds: string[] = this.store.cookiesClient.getWishList().map((wish: Wish) => wish.id);

    this.setShowHideWishList(true);

    moviesFromWishListIds.map(async (id: string) => {
      await axios({
        method: 'get',
        url: `${this.apiUrl}i=${id}`,
      }).then(response => {
        this.moviesFromWishList.push(response.data);
      });
    });
  };

  @action setSearchData = (data: Movie[]) => {
    this.searchData = Array.from(new Set(data));
  };
  @action setShowHideWishList = (value: boolean) => (this.showWishList = value);
  @action removeDuplicates = (movies: Movie[]) => Array.from(new Set(movies));
}
