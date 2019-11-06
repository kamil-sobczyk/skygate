import * as React from 'react';
import styled from 'styled-components';
import {observer, inject} from 'mobx-react';
import {
  Card,
  CardPrimaryAction,
  CardActions,
  CardActionIcons,
  CardActionIcon,
} from '@rmwc/card';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import {Typography} from '@rmwc/typography';
import { useCookies } from 'react-cookie';
import { WishIcon } from './WishIcon';


// interface HomePageProps {
//   store?: Store;
// }

@inject('store')
@observer
export class MovieCard extends React.Component<any> {
  private readonly noImgUrl =
    'https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0';


  render() {
    const {img, title, plot, year, type, id} = this.props;
    return (
      <Card
        style={{
          width: '21rem',
          minHeight: '600px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: '30px 10px',
        }}
      >
        <CardPrimaryAction>
          <Poster src={img !== 'N/A' ? img : this.noImgUrl} />
          <HeaderWrapper>
            <Typography use='headline6' tag='h2'>
              {title}
            </Typography>
            <Typography use='subtitle2' tag='h3' theme='textSecondaryOnBackground' style={{marginTop: '-1rem'}}>
              Year of release: {year}
              <br />
              IMDB ID: {id}
            </Typography>
            <Typography use='body1' tag='div' theme='textSecondaryOnBackground'>
              {plot}
            </Typography>
          </HeaderWrapper>
        </CardPrimaryAction>
        <CardActions>
          <CardActionIcons>
          <WishIcon title={title} id={id}/>
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}

const Poster = styled.img`
  max-width: 100%;
`;

const HeaderWrapper = styled.div`
  padding: 0 1rem 1rem 1rem;
`;
