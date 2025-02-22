function importAll(r) {
  return r.keys().map(r);
}

// Partner Carousel
const partnerimages = importAll(
  require.context("../../assets/Gallery", false, /\.(png|jpe?g|JPG|webp|jfif)$/)
);
const noimg = partnerimages.length;

export const partnerRes = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1920 },
    items: noimg <= 5 ? noimg : 5,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1920, min: 1024 },
    items: noimg <= 4 ? noimg : 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 800 },
    items: noimg <= 3 ? noimg : 3,
    slidesToSlide: 1,
  },
  minitab: {
    breakpoint: { max: 800, min: 464 },
    items: noimg <= 2 ? noimg : 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: noimg <= 1 ? noimg : 1,
    slidesToSlide: 1,
  },
};

export const partnerData = partnerimages.map((image, index) => {
  const fileNameWithExtension = image.default
    ? image.default.split("/").pop()
    : image.split("/").pop();
  const [fileName, extension] = fileNameWithExtension.split(".");
  const fullName = [fileName, extension].join(".");

  return {
    id: index + 1,
    imageurl: image.default || image,
    url: `https://${fullName}`,
  };
});
//-------------------------------------------

// Home BG Carousel
const BGimages = importAll(
  require.context("../../assets/BGs", false, /\.(png|jpe?g|JPG|webp|jfif)$/)
);

export const BGRes = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export const BGData = BGimages.map((image, index) => {
  return {
    id: index + 1,
    imageurl: image.default || image,
  };
});

export const Event_Data = [
  {
    name: "Best Price In Industry",
    icon: "💰",
    desc: "We offer unbeatable prices with no hidden fees. Find the best deals in the travel industry and save big on your next trip.",
  },
  {
    name: "24x7 Customer Service",
    icon: "📞",
    desc: "Our dedicated support team is available around the clock to assist you with any queries or issues, ensuring a smooth and worry-free travel experience.",
  },
  {
    name: "Hassle Free Booking",
    icon: "🛫",
    desc: "Enjoy a seamless booking process with just a few clicks. From flights to accommodations, we make planning your trip effortless and quick.",
  },
  {
    name: "Tailor Made Packages",
    icon: "✈️",
    desc: "Customize your trip exactly how you want it. Choose from a variety of packages and experiences designed to fit your preferences.",
  },
];
