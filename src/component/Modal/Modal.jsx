import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {Overlay, ModalStyled } from './Modal.styled'
import { Component } from 'react';


const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

    componentDidMount() {
        // console.log('Modal componentDidMount');
        window.addEventListener('keydown', this.handleKeyDown);
      }
    
      componentWillUnmount() {
        // console.log('Modal componentWillUnmount');
        window.removeEventListener('keydown', this.handleKeyDown);
      }
    
      handleKeyDown = event => {
        if (event.code === 'Escape') {
          // console.log('Нажали ESC, нужно закрыть модалку');
    
          this.props.onClose();
        }
      };
    
      handleBackdropClick =event =>{
        // console.log('Кликнули в бекдроп');
        if(event.currentTarget === event.target) {
            this.props.onClose();
        }
      }


    render()
    {
return(
    createPortal (
        <Overlay onClick={this.handleBackdropClick}>
        <ModalStyled>{this.props.children}</ModalStyled>
      </Overlay>,
      modalRoot,
        )
);

    }
}

Modal.defaultProps = {
      children: null,
     };
    
     Modal.propTypes = {
       children: PropTypes.node,
       onClose: PropTypes.func.isRequired,
     };

export default Modal;