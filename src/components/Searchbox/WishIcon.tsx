import * as React from 'react';
import {useCookies} from 'react-cookie';
import {CardActionIcon} from '@rmwc/card';

interface Wish {
  title: string;
  id: string;
}

export const WishIcon = (props: Wish) => {
  const {title, id} = props;
  const [cookies, setCookie] = useCookies(['wishList']);

  const onClick = () => {
    const item = {title, id};
    let wishList: Wish[] = [];
    console.log(item);
    cookies.wishList ? (wishList = cookies.wishList) : setCookie('wishList', [], {path: '/'});
    wishList = cookies.wishList;

    console.log('wish', wishList);

    if (wishList && !wishList.includes(item)) {
      wishList.push(item);
    }
    console.log(wishList);

    setCookie('wishList', wishList, {path: '/'});
  };
  return (
    <>
      <CardActionIcon onIcon='favorite' icon='favorite_border' onClick={onClick} />
    </>
  );
};
