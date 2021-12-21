import propTypes from "prop-types";
import {ButtonStyled, ButtonContainer} from './Button.styled'

function Button (props) {
  return (
    <ButtonContainer>

<ButtonStyled 
    onClick={props.onClick}>
      load more
    </ButtonStyled>
    </ButtonContainer>
   
  );
}




Button.propTypes = {
  onClick: propTypes.func.isRequired,
};


export default Button;