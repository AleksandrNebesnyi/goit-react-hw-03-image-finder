import { Component } from 'react';
import Container from './component/Container/Container';
import { ToastContainer } from 'react-toastify';
import Searchbar from './component/Searchbar/Searchbar';
import fetchPixabayImages from './api/pixabay-api.jsx';
import ImageGallery from './component/ImageGallery/ImageGalery';
import Modal from './component/Modal/Modal';
import Loader from './component/Loader/Loader';
import Button from './component/Button/Button';
import ErrorMessage from './component/ErrorMessage/ErrorMasage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    images: [],
    error: null,
    showModal: false,
    largeImage: '',
  };

  // Стартовый метод.
  // Если при обновлении запрос не равен между стейтами, тогда делаем фетч
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.getImages();
    }
  }

  // Принимаем с формы запрос и пишем в стейт + сбрасываем после отправки значения из стейта
  handleOnSubmit = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      currentPage: 1,
      error: null,
    });
  };

  handleOnClick = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  // Получаем дату из фетча
  getImages = async () => {
    const { currentPage, searchQuery } = this.state;

    this.setState({
      isLoading: true,
    });

    try {
      const hits = await fetchPixabayImages(searchQuery, currentPage).then(
        data => data.hits,
      );

      if (hits.length === 0) {
        toast.info('Введите валидний запрос');
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));

      if (currentPage !== 1) {
        this.scrollOnLoadButton();
      }
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };
  //  Скролл при клике на кнопку
  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage: '',
    }));
  };

  // Получает полное изображение, пишет его в стейт и открывает модалку
  handleGalleryItem = fullImageUrl => {
    this.setState({
      largeImage: fullImageUrl,
      showModal: true,
    });
  };

  render() {
    const { images, isLoading, showModal, largeImage, error } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleOnSubmit} />

        <ImageGallery images={images} onImageClick={this.handleGalleryItem} />

        {!isLoading && images.length >= 12 && (
          <Button onClick={this.handleOnClick} />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt="" className="Modal-image" />
          </Modal>
        )}

        {isLoading && <Loader />}
        {error && <ErrorMessage message={error.message} />}

        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}

export default App;
