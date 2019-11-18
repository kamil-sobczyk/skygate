import * as React from 'react';
import {observer, Provider} from 'mobx-react';
import {Store} from '../Lib/Store';
import {HomePage} from './Pages/HomePage/HomePage';
import { AppBar } from './AppBar';
import { Footer } from './Footer';

interface AppProps {

}

@observer
export class App extends React.Component<AppProps> {
  private readonly store = new Store();

  render() {
    if (!this.store) {
      return <h1>App initialization error!</h1>;
    }
    return (
      <Provider store={this.store}>
        <>
        {/* <AppBar/> */}
        <HomePage />
        <Footer/>
        </>
      </Provider>
    );
  }
}
