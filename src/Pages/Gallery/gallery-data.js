function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../../assets/Halocon Gallery', false, /\.(png|jpe?g|JPG|webp)$/));



export const productData = images.map((image, index) => ({
  id: index + 1,
  imageurl: image.default || image,
}));
export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
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