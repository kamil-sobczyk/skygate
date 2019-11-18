import {ApiClient} from './ApiClient';

export class Store {
  apiClient: ApiClient;
    store: any;
  constructor() {
    this.apiClient = new ApiClient(this);
  }
}
