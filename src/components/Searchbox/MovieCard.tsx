import * as React from 'react';
import styled from 'styled-components';
import {observer, inject} from 'mobx-react';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionButton,
  CardActionIcons,
  CardActionIcon,
} from '@rmwc/card';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import {Typography} from '@rmwc/typography'

// interface HomePageProps {
//   store?: Store;
// }

@inject('store')
@observer
export class MovieCard extends React.Component<any> {
  render() {
    const {img, title, plot, year, type, id} = this.props;
    return (
      <Card style={{width: '21rem'}}>
        <CardPrimaryAction>
          <CardMedia
            style={{
              backgroundImage: img,
            }}
          />
          <div style={{padding: '0 1rem 1rem 1rem'}}>
            <Typography use='headline6' tag='h2'>
              {title}
            </Typography>
            <Typography use='subtitle2' tag='h3' theme='textSecondaryOnBackground' style={{marginTop: '-1rem'}}>
              {year}{type}{id}
            </Typography>
            <Typography use='body1' tag='div' theme='textSecondaryOnBackground'>
              {plot}
            </Typography>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons>
            <CardActionButton>Read</CardActionButton>
            <CardActionButton>Bookmark</CardActionButton>
          </CardActionButtons>
          <CardActionIcons>
            <CardActionIcon onIcon='favorite' icon='favorite_border' />
            <CardActionIcon icon='share' />
            <CardActionIcon icon='more_vert' />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}
