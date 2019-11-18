import {Store} from './Store';

export class ApiClient {
  store: Store;

  constructor(store: Store) {
    this.store = store;
  }

}
