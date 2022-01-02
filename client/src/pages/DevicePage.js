import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row, ListGroup } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneDevice } from "../http/deviceAPI";

const DevicePage = () => {
  const [productsCount, setProductsCount] = useState(0)
  const [device, setDevice] = useState({ info: [] })
  const { id } = useParams()
  useEffect(() => {
    fetchOneDevice(id).then(data => {
      setDevice(data)
      setProductsCount(data.count)
    })
  }, [])

  return (
    <Container className="mt-3" fluid>
      <Row>
        <Col
          xl={4} md={7}
        >
          <Image
            src={process.env.REACT_APP_API_URL + device.img}
            rounded />
        </Col>
        <Col
          xl={8} md={5}
        >
          <h1>{device.name} </h1>
          <Row className="device__info">
            {
              device.info &&
              <Col lg={6}>
                <h2>Характеристики</h2>
                <ListGroup className="device__list">
                  {device.info.map((info, index) =>
                    <ListGroup.Item key={info.id} className="d-flex justify-content-between border-0" style={{ padding: "10px 0px" }}>
                      <span className="device-info__name pr-1 text-secondary">{info.title}</span> <div className="device-info__value text-secondary pl-1">{info.description}</div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Col>
            }
            <Col lg={6} className="device-info__buy mb-2">
              <Card
                border="light"
                className="device-info__card d-flex flex-column h-100"
              >
                <small className="text-secondary mb-2">Цена за шт.</small>
                <h2 className="text-dark mb-2">{device.price} руб.</h2>
                {
                  productsCount ?
                    <>
                      <Button className="mb-2 device-card__btn" variant={"warning"}
                        onClick={() => setProductsCount(productsCount => productsCount - 1)}
                      >Добавить в корзину</Button>
                      <p style={{ fontSize: '16px' }}>Осталось на складе: {productsCount} шт.</p>
                    </>
                    :
                    <Button className="mb-1 device-card__btn" variant={"secondary"}>Нет в наличии</Button>
                }
              </Card>
            </Col>
          </Row>
        </Col>
      </Row >
      <Row className="my-3">
        <Col md={6}>
          <h2>Описание </h2>
          <p style={{ fontSize: '16px' }}>{device.description} </p>
        </Col>
      </Row>
    </Container >
  );
};

export default DevicePage;
