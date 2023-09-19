import React from 'react';
import { ModalBoxContent } from './Modal.styled';

export function Modal({ imgData: { largeImageURL, tags } }) {
  return (
    <ModalBoxContent>
      <img src={largeImageURL} alt={tags} />
    </ModalBoxContent>
  );
}
