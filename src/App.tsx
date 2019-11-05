import * as React from 'react';
import {observable} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {Store} from './lib/Store';
import {HomePage} from './components/HomePage';

@observer
export class App extends React.Component<{}, {}> {
  private store = new Store();


  render() {
    if (!this.store) {
      return <div>App initialization error!</div>;
    }
    return (
      <Provider store={this.store}>
        <HomePage />
      </Provider>
    );
  }
}
