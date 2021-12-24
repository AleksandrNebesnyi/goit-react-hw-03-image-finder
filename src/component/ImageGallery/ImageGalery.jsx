import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import {List } from './ImageGalery.styled'

const ImageGallery = ({ images, onImageClick }) => (
  <List >
    {images.map(image => {
           return (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onImageClick={onImageClick}
        />
      );
    })}
  </List>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;