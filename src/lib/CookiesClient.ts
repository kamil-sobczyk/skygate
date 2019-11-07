import {action} from 'mobx';
import {Store} from './Store';
import {Wish} from './Interfaces';

export class CookiesClient {
  store: Store;

  constructor(store: Store) {
    this.store = store;
  }
  private wishList: Wish[] = [];

  getWishList = (): Wish[] => this.wishList;
  @action setWishList = (wishList: Wish[]): Wish[] => (this.wishList = wishList);
  @action addRemoveWish = (wish: Wish): void => {
    if (!JSON.stringify(this.wishList).includes(JSON.stringify(wish))) {
      this.wishList.push(wish);
    } else {
      this.wishList = this.wishList.filter((item: Wish) => wish.id !== item.id);
    }
  };
}
