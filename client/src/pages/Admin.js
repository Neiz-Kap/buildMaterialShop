import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, Row, Col, Form, Dropdown } from "react-bootstrap";
import { Context } from "../index";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import { fetchBrands, fetchTypes } from "../http/deviceAPI";
import { observer } from 'mobx-react-lite';

const Admin = observer((props) => {
  const { device } = useContext(Context)
  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))

    fetchBrands().then(data => device.setBrands(data))
  }, [])

  const clickDropDownTypes = () => {
    fetchTypes().then(data => device.setTypes(data))
  }

  const clickDropDownBrands = () => {
    fetchBrands().then(data => device.setBrands(data))
  }

  console.log(`____________`);
  // console.log(`device.brand`, JSON.stringify(device.brands, null, 2))
  // console.log(`device.types`, JSON.stringify(device.types, null, 2))
  return (
    <Container className="d-flex flex-column">
      <Row>
        <Col md="4" className="mt-3 d-flex flex-column align-items-center">
          <Form.Label className="d-block mb-3">Строительные материалы</Form.Label>
          <Button
            variant={"outline-primary"}
            className="p-2 d-block"
            onClick={() => setDeviceVisible(true)}
          >
            Добавить товар
          </Button>
          <Button variant="outline-danger"
            className="mt-2 p-2 d-block"
          >
            Удалить товар
          </Button>
        </Col>

        <Col md="4" className="mt-3 d-flex flex-column align-items-center">
          <Form.Label className="d-block mb-3">Категории стройматериалов</Form.Label>
          <Button
            variant={"outline-primary"}
            className="p-2 d-block"
            onClick={() => setTypeVisible(true)}
          >
            Добавить категорию
          </Button>
          <Button variant="outline-danger"
            className="p-2 mt-2 d-block"
          >
            Удалить категорию
          </Button>
          <Dropdown className="mt-2" onClick={clickDropDownTypes}>
            <Dropdown.Toggle variant="info">{"Все категории"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type =>
                <Dropdown.Item
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col md="4" className="mt-3 d-flex flex-column align-items-center">
          <Form.Label className="d-block mb-3">Поставщики</Form.Label>
          <Button
            variant={"outline-primary"}
            className="p-2 d-block"
            onClick={() => setBrandVisible(true)}
          >
            Добавить поставщика
          </Button>
          <Button variant="outline-danger"
            className="mt-2 p-2 d-block"
          >
            Удалить поставщика
          </Button>
          <Dropdown className="mt-2" onClick={clickDropDownBrands}>
            <Dropdown.Toggle variant="info">{"Все поставщики"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand =>
                <Dropdown.Item
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>


        {brandVisible && <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />}
        {deviceVisible && <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />}
        {typeVisible && <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />}
      </Row>
    </Container >
  );
});

export default Admin;
