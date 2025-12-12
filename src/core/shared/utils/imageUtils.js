const getImageUrl = (imageName) => {
  const cleanName = imageName.endsWith('.webp') ? imageName.slice(0, -5) : imageName;
  
  try {
    return require(`../assets/${cleanName}.webp`);
  } catch (error) {
    console.error(`Image not found: ${cleanName}.webp`);
    return '';
  }
};

export default getImageUrl;
