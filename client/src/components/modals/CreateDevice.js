import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { Context } from "../../index";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [count, setCount] = useState('')
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
  }, [])

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }
  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }
  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', `${price}`)
    formData.append('count', `${count}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data => onHide())
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить товар
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex flex-wrap">
            <Dropdown className="mr-2">
              <Dropdown.Toggle variant="info">{device.selectedType.name || "Тип стройматериала..."}</Dropdown.Toggle>
              <Dropdown.Menu>
                {device.types.map(type =>
                  <Dropdown.Item
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                  >
                    {type.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            {/* <Form.Control type="text" list="data" placeholder="Категория..." />
            <datalist id="data">
              {['908gbjmn', '334dgdfs', '3asrfsda'].map((item, key) =>
                <option key={key} value={item} />
              )}
            </datalist> */}
            <Dropdown className="">
              <Dropdown.Toggle variant="info">{device.selectedBrand.name || "Поставщик..."}</Dropdown.Toggle>
              <Dropdown.Menu>
                {device.brands.map(brand =>
                  <Dropdown.Item
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                  >
                    {brand.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Form.Control
            className="mt-3"
            type="file"
            onChange={selectFile}
          />
          <FloatingLabel
            controlId="floatingInput"
            label="Введите название товара"
            className="mt-3"
          >
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Введите название товара"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea" label="Введите описание товара" className="mt-3">
            <Form.Control
              as="textarea"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Введите описание товара"
            />
          </FloatingLabel>
          <Form.Label className="mt-3">Введите:</Form.Label>
          <Row className="g-2">
            <Col md>
              <Form.Control
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                type="number"
                placeholder="стоимость в рублях"

              />
            </Col>
            <Col md>
              <Form.Control
                value={count}
                onChange={e => setCount(Number(e.target.value))}

                placeholder="кол-во материала"
                type="number"
              />
            </Col>
          </Row>

          <hr />
          <Button
            variant={"outline-dark"}
            onClick={addInfo}
          >
            Добавить характеристику
          </Button>
          {info.map(i =>
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant={"outline-danger"}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
      </Modal.Footer>
    </Modal >
  );
});

export default CreateDevice;
