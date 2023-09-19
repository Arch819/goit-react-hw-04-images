import { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { getImg } from 'services/fetchImg';
import { ContainerStyled, ErrorMessageStyled } from './App.styled';
import { ButtonUp } from './ButtonUp';
import { Notify } from 'notiflix';

export const App = () => {
  const [img, setImg] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchValue.length) return;
    setIsLoading(true);
    getImg(searchValue)
      .then(data => {
        if (data.totalHits < 1) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        scroll.scrollToTop();
        setPage(1);
        setTotalPage(Math.ceil(data.totalHits / 12));
        setImg(data.hits);
        setError(null);
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      })
      .catch(({ message }) => {
        img.length ? Notify.failure(message) : setError(message);
      })
      .finally(() => setIsLoading(false));
  }, [searchValue]);

  useEffect(() => {
    if (page === 1) return;
    setIsLoading(true);
    getImg(searchValue, page)
      .then(data => {
        setImg(prevImg => [...prevImg, ...data.hits]);
        if (page !== 1) smoothScroll(getNextPageHeight());
      })
      .catch(({ message }) => Notify.failure(message))
      .finally(() => setIsLoading(false));
  }, [page]);

  function onChangePage() {
    setPage(prevPage => prevPage + 1);
  }
  function getNextPageHeight() {
    const { height: cardHeight } = document
      .querySelector('.galleryWrapp')
      .firstElementChild.getBoundingClientRect();
    return cardHeight;
  }
  function smoothScroll(cardHeight) {
    scroll.scrollMore(cardHeight * 2);
  }

  function onSubmit(value) {
    setSearchValue(value);
  }

  return (
    <ContainerStyled>
      <Searchbar onSubmit={onSubmit} currentPage={{ page, totalPage }} />
      {error && <ErrorMessageStyled>{error}</ErrorMessageStyled>}
      <ImageGallery img={img} />
      {isLoading && <Loader />}
      {totalPage > 1 && page < totalPage && <Button onClick={onChangePage} />}
      <ButtonUp />
    </ContainerStyled>
  );
};
