import React from 'react'
import {Navbar, Nav, Container, NavbarBrand, NavbarToggle, NavbarCollapse, NavLink} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <NavbarBrand href='/'>
                <img src={logo} alt='ProShop Logo' /> ProShop</NavbarBrand>
                <NavbarToggle aria-controls='basic-navbar-nav'></NavbarToggle>
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <NavLink href='/cart'>
                            <FaShoppingCart /> Cart
                        </NavLink>
                        <NavLink href='/login'>
                            <FaUser /> Sign In
                        </NavLink>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header