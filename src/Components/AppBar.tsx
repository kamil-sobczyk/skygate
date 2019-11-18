import * as React from 'react';
import {TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust} from '@rmwc/top-app-bar';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';

interface AppBarProps {}

export class AppBar extends React.Component<AppBarProps> {
  render() {
    return (
      <>
        <TopAppBar fixed>
          <TopAppBarRow>
            <TopAppBarSection>
              <TopAppBarTitle>Fixed</TopAppBarTitle>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust />
      </>
    );
  }
}
