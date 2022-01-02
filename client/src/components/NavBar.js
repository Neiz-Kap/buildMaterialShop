import React, { useContext } from 'react';
import { Context } from "../index";
import { NavLink, useHistory } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from "../utils/consts";
import { Container, Button, Form, Nav, Navbar } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import logo from "../assets/logo.svg"
import search from "../assets/search.svg"
import basket from "../assets/basket.svg"

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const history = useHistory()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  const clickSearch = (e) => {
    e.preventDefault()
  }

  console.log(`user: ${JSON.stringify(user.user.role, null, 2)}`)

  return (
    <Navbar
      // bg="primary" variant="primary"
      // style={{ backgroundColor: "#5586a7" }}
      className="border-bottom py-4"
    >
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center">
          <NavLink to={SHOP_ROUTE} >
            <img
              src={logo}
              className="mr-5"
              alt="Logo"
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
          <Nav
            className="w-100"
          >
            <Form className="d-flex navbar-seacrh w-100 m-auto">
              <input className="navbar--search__input w-100" type="text" autocomplete="off" name="search" placeholder="Поиск" value="" />
              <button className="navbar--search__button" title="Искать" type="submit"
                onClick={clickSearch}
              >
                <img src={search} alt="поиск" />
              </button>
            </Form>
          </Nav>
        </Navbar.Collapse>
        {user.isAuth ?
          <Nav className="ml-3">
            {user.user.role === 'ADMIN' &&
              <NavLink className="py-2 mx-2" to={ADMIN_ROUTE}>
                Админпанель
              </NavLink>
            }
            <NavLink className="mr-2 d-flex align-items-center" to={BASKET_ROUTE}>
              <span className="navbar-basket__icon">
                <img src={basket} alt="корзина" />
              </span>
              <span className="c1hh5p11 d-flex flex-column">
                <span className="navbar-basket__text">Корзина</span>
                <span className="navbar-basket__price">0 ₽</span>
              </span>
            </NavLink>

            {/* <Button
              variant={"outline-dark"}
              onClick={() => logOut()}
              className="ml-2"
            >
              Выйти
            </Button> */}
          </Nav>
          :
          <Nav className="ml-auto" style={{ color: 'white' }}>
            <Button variant={"outline-dark"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
          </Nav>
        }
      </Container>
    </Navbar>

  );
});

export default NavBar;
