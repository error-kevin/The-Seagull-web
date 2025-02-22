import slide_1 from '../../assets/Cgc/1.jpeg';
import slide_2 from '../../assets/Cgc/2.jpeg';
import slide_3 from '../../assets/Cgc/3.jpeg';
import slide_4 from '../../assets/Cgc/4.jpeg';


export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 2,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const imageData = [
  {
    id: 1,
    imageurl:slide_1
  },
  {
    id: 2,
    imageurl:slide_2
  },
  {
    id: 3,
    imageurl:slide_3
  },
  {
    id: 4,
    imageurl:slide_4
  },
  


];
