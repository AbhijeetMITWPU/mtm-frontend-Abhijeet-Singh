import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

import place01 from '../Images/place01.jpg';
import place02 from '../Images/place02.jpg';
import place03 from '../Images/place03.jpg';
import place04 from '../Images/place04.jpg';
import place05 from '../Images/place05.jpg';

const vacationImages = [
  { url: place01, alt: 'Place 01' },
  { url: place02, alt: 'Place 02' },
  { url: place03, alt: 'Place 03' },
  { url: place04, alt: 'Place 04' },
  { url: place05, alt: 'Place 05' },
];

const Slide = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
  height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {vacationImages.map((image, index) => (
        <Slide key={index}>
          <Image src={image.url} alt={image.alt} />
        </Slide>
      ))}
    </Slider>
  );
};

export default ImageSlider;
