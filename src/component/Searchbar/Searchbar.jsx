import { Component } from 'react';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled'
import PropTypes from "prop-types";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { MdFindReplace } from "react-icons/md";
import { IconContext } from "react-icons";





class Searchbar extends Component {

  state = {
    searchQuery: "",
  }

  handleSubmitChange = (event) => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() })
  };


  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === "") {
        toast.error('Введите Запрос.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });

  };

  render() {

    return (
      <Header >
        <Form onSubmit={this.handleSubmit} >
          <Button type="submit"  >
            <IconContext.Provider value={{ color: "ffffff", size: "2em" }}>
              <div>
                <MdFindReplace />
              </div>
            </IconContext.Provider>



            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleSubmitChange}

          />
        </Form>
      </Header>
    )
  }

}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;