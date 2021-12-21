import { Component } from "react";
import Container from "./component/Container/Container";
import { ToastContainer } from 'react-toastify';
import Searchbar from "./component/Searchbar/Searchbar";
import fetchPixabayImages from './api/pixabay-api.jsx';
import ImageGallery from "./component/ImageGallery/ImageGalery";
import Modal from './component/Modal/Modal';
import Loader from "./component/Loader/Loader";
import Button from "./component/Button/Button";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



class App extends Component {
  state ={
    searchQuery :"",
    currentPage : 1,
    isLoading :false,
    images: [],
    error: null,
    showModal: false,
    largeImage: '',


  }
  

// Стартовый метод.
// Если при обновлении запрос не равен между стейтами, тогда делаем фетч
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
       this.getImages();
     }
   }


handleOnSubmit = searchQuery => {
    
  this.setState({
       
    searchQuery,
    images:[],
    currentPage:1,
    error:null,
    }) };


// Получаем дату из фетча
  getImages = async () => {
   const { currentPage, searchQuery } = this.state;

   this.setState({
    isLoading: true,
    });
    try {
     const  hits  = await fetchPixabayImages(searchQuery , currentPage).then(( data ) => data.hits);
    //  console.log(hits);
 
  
 this.setState(prevState => ({
 images: [...prevState.images, ...hits],
       currentPage: prevState.currentPage + 1,
      }));

     if (currentPage !== 1) {
       this.scrollOnLoadButton();
      }
    } catch (error) {
      console.log('Smth wrong with App fetch', error);
       this.setState({ error });
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
   



render(){

  const { images, isLoading, showModal, largeImage, error } = this.state;
  
  const notify = () => toast.error("Wow so easy !");
return(


  <Container>
    <Searchbar onSubmit={this.handleOnSubmit}/>
    <ImageGallery images={images} onImageClick={this.handleGalleryItem} />
    {isLoading && <Button onClick={this.getImages} />}

    {showModal && (
         <Modal
          onClose={this.toggleModal}>
            <img src={largeImage} alt="" className="Modal-image" />
                            
           </Modal>  
                  )}

    {isLoading && <Loader />}


    {error && (
      <div>
      notify();
       </div>
        )}
   
    <ToastContainer autoClose={3000} />

  </Container>
)
} 
}

export default App;
