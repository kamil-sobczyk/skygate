import * as React from 'react';
import {observer, Provider} from 'mobx-react';
import {withCookies, Cookies} from 'react-cookie';
import {Store} from './lib/Store';
import {HomePage} from './components/HomePage';

interface AppProps {
  cookies: Cookies;
}

@observer
class App extends React.Component<AppProps> {
  private store = new Store();

  componentWillMount = () => {
    const {cookies} = this.props;
    const {setWishList} = this.store.cookiesClient;
    const isWishListExist = !!cookies.get('wishList');

    if (!isWishListExist) {
      cookies.set('wishList', [], {path: '/'});
      setWishList([]);
    } else {
      setWishList(cookies.get('wishList'));
    }
  };

  render() {
    if (!this.store) {
      return <h1>App initialization error!</h1>;
    }
    return (
      <Provider store={this.store}>
        <HomePage />
      </Provider>
    );
  }
}

export default withCookies(App);
