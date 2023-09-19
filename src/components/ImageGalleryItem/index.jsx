import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Modal } from '../Modal';
import { ImageGalleryItemStyled } from './ImageGalleryItem.styled';
import { ModalStyled } from 'components/Modal/Modal.styled';
ReactModal.setAppElement('#root');

export function ImageGalleryItem({
  itemImg: { webformatURL, tags, largeImageURL },
}) {
  const [showModal, setShowModal] = useState(false);

  function handleOpenModal() {
    document.body.style.overflow = 'hidden';
    setShowModal(true);
  }

  function handleCloseModal() {
    document.body.style.overflow = '';
    setShowModal(false);
  }
  return (
    <>
      <ImageGalleryItemStyled onClick={() => handleOpenModal()}>
        <img src={webformatURL} alt={tags} width={300} />
      </ImageGalleryItemStyled>
      <ReactModal
        isOpen={showModal}
        contentLabel="Modal"
        onRequestClose={handleCloseModal}
        style={ModalStyled}
      >
        <Modal imgData={{largeImageURL, tags}} />
      </ReactModal>
    </>
  );
}
