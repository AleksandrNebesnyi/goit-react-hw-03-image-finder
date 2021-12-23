import PropTypes from 'prop-types';
import {Message} from './ErrorMassage.styled'


function ErrorMessage({ message }) {
  return (
    <Message role="alert">
      <p>{message}</p>
    </Message>
  );
}

ErrorMessage.propTypes ={
  message : PropTypes.string,
}
 
export default ErrorMessage;