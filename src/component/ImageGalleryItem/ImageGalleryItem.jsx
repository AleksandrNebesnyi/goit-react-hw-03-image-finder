import PropTypes from 'prop-types';
import {Item, Img } from './ImageGalleryItem.styled'

const ImageGalleryItem = ({ image, onImageClick }) => {
  const fullImage = () => onImageClick(image.largeImageURL);

  return (
    <Item>
      <Img
        src={image.webformatURL}
        alt={image.tags}
        onClick={fullImage}
      />
    </Item>
  );
};


ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;