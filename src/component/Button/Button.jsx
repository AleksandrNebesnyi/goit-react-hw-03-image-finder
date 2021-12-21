import propTypes from "prop-types";
import ButtonStyled from './Button.styled'

function Button (props) {
  return (
    <ButtonStyled 
    onClick={props.onClick}>
      load more
    </ButtonStyled>
  );
}




Button.propTypes = {
  onClick: propTypes.func.isRequired,
};


export default Button;