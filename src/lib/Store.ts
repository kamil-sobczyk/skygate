import {CookiesClient} from './CookiesClient';
import {ApiClient} from './ApiClient';

export class Store {
  apiClient: ApiClient;
  cookiesClient: CookiesClient;
    store: any;
  constructor() {
    this.apiClient = new ApiClient(this);
    this.cookiesClient = new CookiesClient(this);
  }
}
