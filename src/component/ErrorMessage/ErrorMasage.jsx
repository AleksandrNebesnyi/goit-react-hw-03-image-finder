import PropTypes from 'prop-types';
import Message from './ErrorMassage.styled'



const ErrorMessage = ({ children }) => (
    <Message> {children}</Message>
  );
  
  ErrorMessage.defaultProps = {
    children: [],
  };
  
  ErrorMessage.propTypes = {
    children: PropTypes.node,
  };
  
  export default ErrorMessage;