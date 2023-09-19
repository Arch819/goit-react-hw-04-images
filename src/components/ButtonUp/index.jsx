import { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import * as ButtonUpStyled from './ButtonUp.styled';
import { FaArrowCircleUp } from 'react-icons/fa';
import { useState } from 'react';

export const ButtonUp = () => {
  const [buttonIsHidden, setButtonIsHidden] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    const scrolledDistance = window.scrollY;

    if (scrolledDistance >= 600) setButtonIsHidden(false);
    else setButtonIsHidden(true);
  }

  return (
    <ButtonUpStyled.ButtonUpStyled
      onClick={() => scroll.scrollToTop()}
      style={{ display: buttonIsHidden ? 'none' : 'block' }}
    >
      <FaArrowCircleUp fill="#3f51b5" />
    </ButtonUpStyled.ButtonUpStyled>
  );
};
