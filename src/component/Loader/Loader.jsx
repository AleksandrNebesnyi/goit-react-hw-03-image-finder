import Template from 'react-loader-spinner';
import {Component} from 'react';
import {LoaderStyled} from './Loader.styled'


class Loader extends Component { 
   render() {
     return (
       <LoaderStyled>
         <Template type="TailSpin" color="#02be6e" height={100} width={100} />
       </LoaderStyled>
     );
   }
 }

export default Loader;