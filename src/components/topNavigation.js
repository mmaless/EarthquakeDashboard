import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBIcon,
} from 'mdbreact';
import logo from '../assets/logo.png';

class TopNavigation extends Component {
  state = {
    collapse: false,
  };

  onClick = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  render() {
    return (
      <MDBNavbar className='flexible-navbar' light expand='md' scrolling>
        <MDBNavbarBrand href='#'>
          <img src={logo} height='40' alt='' />
        </MDBNavbarBrand>
        <MDBNavbarBrand href='/'>
          <strong>Earthquakes Dashboard</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.onClick} />
        <MDBCollapse isOpen={this.state.collapse} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <a
                className='border border-light rounded mr-1 nav-link Ripple-parent'
                rel='noopener noreferrer'
                href='https://github.com/mhmdess'
                target='_blank'
              >
                <MDBIcon fab icon='github' className='mr-2' />
                GitHub
              </a>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default TopNavigation;
