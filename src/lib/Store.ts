import { ApiClient } from './ApiClient';

export class Store {
  apiClient: ApiClient;
  constructor() {
    this.apiClient = new ApiClient(this);
  }
}
