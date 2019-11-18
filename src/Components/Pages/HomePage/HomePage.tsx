import * as React from 'react';
import {Logo} from './Sections/Logo';
import {Input} from './Sections/Input';
import {inject, observer} from 'mobx-react';
const logoImage = require('../../../Lib/Assets/googleLogo.png');

interface HomePageProps {}

@inject('store')
@observer
export class HomePage extends React.Component<HomePageProps> {
  private readonly handleChangeInputText = (text: string) => {
    console.log('text', text);
  };
  private readonly handleHitEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log('search');
      e.preventDefault();
    }
  };
  private readonly handleClickSearchButton = () => {
    console.log('click');
  };

  render() {
    return (
      <>
        <Logo image={logoImage} />
        <Input
          handleChangeInputText={this.handleChangeInputText}
          handleHitEnter={this.handleHitEnter}
          handleClickSearchButton={this.handleClickSearchButton}
        />
      </>
    );
  }
}
