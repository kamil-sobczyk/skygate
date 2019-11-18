import * as React from 'react';
import styled from 'styled-components';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import {IconButton} from '@rmwc/icon-button';

const suggestions = ['France', 'Germany', 'Poland', 'Spain'];

interface InputProps {
  handleChangeInputText: (text: string) => void;
  handleHitEnter: (e: React.KeyboardEvent) => void;
  handleClickSearchButton: () => void;
}

export const Input = (props: InputProps): JSX.Element => (
  <InputContainer>
    <TextInput
      options={suggestions}
      placeholder='Type country name here...'
      matchAny={true}
      trigger=''
      onChange={props.handleChangeInputText}
      onKeyDown={props.handleHitEnter}
    />
    <SearchIcon icon='search' onClick={props.handleClickSearchButton} />
  </InputContainer>
);

const InputContainer = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  textarea {
    padding: 15px 0 0 30px;
    line-height: 16px;
    font-size: 16px;
    min-width: 400px;
    border-radius: 15px;
    border: 1px solid rgba(220, 220, 220, 0.5);
    box-shadow: 4px 4px 5px 0px rgba(199, 199, 199, 1);
    margin: 0 25px;
    &::placeholder {
      opacity: 0.3;
    }
  }
`;

const SearchIcon = styled(IconButton)`
  border: none;
  height: 49px;
  width: 49px;
  border-radius: 50%;
`;
