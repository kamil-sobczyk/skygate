import * as React from 'react';
import {observer, Provider} from 'mobx-react';
import {Store} from './lib/Store';

@observer
export class App extends React.Component<any> {
  private store = new Store();

  render() {
    if (!this.store) {
      return <h1>App initialization error!</h1>;
    }
    return (
      <Provider store={this.store}>
        <h1>App</h1>
      </Provider>
    );
  }
}

