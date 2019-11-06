import * as React from 'react';
import styled from 'styled-components';
import {observer, inject} from 'mobx-react';
import {Card, CardPrimaryAction, CardActions, CardActionIcons, CardActionIcon} from '@rmwc/card';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import {Typography} from '@rmwc/typography';
import { withCookies, Cookies} from 'react-cookie';
import {Wish} from '../../lib/Interfaces';
import {Store} from '../../lib/Store';
import {observable} from 'mobx';

interface MovieCardProps {
  cookies: Cookies;
  img: string;
  title: string;
  plot: string;
  year: string;
  type: string;
  id: string;
  store?: Store;
}

@inject('store')
@observer
class MovieCard extends React.Component<MovieCardProps> {
  private readonly movie: Wish = {title: this.props.title, id: this.props.id};
  private readonly noImgUrl: string =
    'https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0';
  @observable private isMovieOnWishList: boolean = !!JSON.stringify(
    this.props.store!.cookiesClient.getWishList(),
  ).includes(JSON.stringify(this.movie));
  state = {icon: this.isMovieOnWishList ? 'favorite' : 'favorite_border'};

  addRemoveWish = () => {
    const {cookies} = this.props;
    const {addRemoveWish, getWishList} = this.props.store!.cookiesClient;
    const {icon} = this.state;

    addRemoveWish(this.movie);
    cookies.set('wishList', getWishList(), {path: '/'});
    this.setState({icon: icon === 'favorite' ? 'favorite_border' : 'favorite'});
  };

  render() {
    const {img, title, plot, year, type, id} = this.props;

    console.log('is on list? :', this.isMovieOnWishList);

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
              <br />
              Type: {type}
            </Typography>
            <Typography use='body1' tag='div' theme='textSecondaryOnBackground'>
              {plot}
            </Typography>
          </HeaderWrapper>
        </CardPrimaryAction>
        <CardActions>
          <CardActionIcons>
            <CardActionIcon
              icon={this.state.icon}
              onClick={this.addRemoveWish}
            />
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

export default withCookies(MovieCard);
