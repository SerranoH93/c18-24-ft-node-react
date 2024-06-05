const colorPalettes = [
  "c95c7a,de9153,d6d644,dcebaf,14888b",
  "fea304,909320,125a44,37192c,220315",
  "333237,fb8351,ffad64,e9e2da,add4d3",
  "f0d8a8,3d1c00,86b8b1,f2d694,fa2a00",
  "bcbdac,cfbe27,f27435,f02475,3b2d38",
];

const randomColorPalette = () => {
  const randomNumber = Math.round(Math.random() * 4);

  return colorPalettes[randomNumber];
};

export default randomColorPalette;
